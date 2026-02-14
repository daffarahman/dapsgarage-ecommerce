import { useEffect, useState } from "react";
import { productsApi } from "../../api/products";
import { formatCurrency } from "../../lib/format-currency";
import type { Product } from "../../types/product";
import { useSearchParams } from "react-router";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const defaultPageSize: number = 4;

function normalizeDiscountPercent(discount: number) {
  if (!Number.isFinite(discount) || discount <= 0) {
    return 0;
  }

  if (discount <= 1) {
    return Math.min(100, discount * 100);
  }

  return Math.min(100, discount);
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page") ?? "1");
  const currentPage =
    Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  useEffect(() => {
    const controller = new AbortController();

    const inStockParam = searchParams.get("in_stock");
    const categoryParam = searchParams.get("category");

    async function loadProducts() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const data = await productsApi.getAll({
          limit: defaultPageSize,
          offset: (currentPage - 1) * defaultPageSize,
          inStock:
            inStockParam === "true"
              ? true
              : inStockParam === "false"
                ? false
                : undefined,
          category: categoryParam ?? undefined,
          signal: controller.signal,
        });
        setProducts(data);
      } catch {
        if (!controller.signal.aborted) {
          setErrorMessage("Failed to load products. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      controller.abort();
    };
  }, [searchParams, currentPage]);

  const hasProducts = products.length > 0;
  const canGoPrevious = currentPage > 1;
  const canGoNext = products.length === defaultPageSize;

  const getPageHref = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);

    if (page <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(page));
    }

    const queryString = nextParams.toString();
    return queryString ? `?${queryString}` : "?";
  };

  const goToPage = (page: number) => {
    const sanitizedPage = Math.max(1, page);
    const nextParams = new URLSearchParams(searchParams);

    if (sanitizedPage === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(sanitizedPage));
    }

    setSearchParams(nextParams);
  };

  return (
    <div className="space-y-6 min-h-screen">
      <h1 className="text-3xl font-bold">Products</h1>

      {isLoading && <p>Loading products...</p>}

      {!isLoading && errorMessage && <p>{errorMessage}</p>}

      {!isLoading && !errorMessage && !hasProducts && <p>No products found.</p>}

      {!isLoading && !errorMessage && hasProducts && (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => {
            const discountPercent = normalizeDiscountPercent(product.discount);
            const hasDiscount = discountPercent > 0;
            const discountedPrice = product.price * (1 - discountPercent / 100);
            const isSingleItemInLastRowOnTwoCol =
              products.length % 2 === 1 && index === products.length - 1;
            const isSingleItemInLastRowOnThreeCol =
              products.length % 3 === 1 && index === products.length - 1;

            return (
              <li
                key={product.id}
                className={`min-w-0 ${
                  isSingleItemInLastRowOnTwoCol
                    ? "col-span-2 mx-auto w-full max-w-[calc(50%-0.5rem)]"
                    : ""
                } ${
                  isSingleItemInLastRowOnThreeCol
                    ? "md:col-span-3 md:mx-auto md:w-full md:max-w-[calc(33.333%-0.75rem)] xl:col-span-1 xl:max-w-none"
                    : ""
                }`}
              >
                <Card className="flex h-full w-full flex-col gap-0 overflow-hidden py-0">
                  <div className="relative w-full overflow-hidden bg-muted">
                    <div className="aspect-square w-full">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                    {product.stock <= 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute left-2 top-2"
                      >
                        Sold Out
                      </Badge>
                    )}
                    {hasDiscount && (
                      <Badge
                        className="absolute right-2 top-2"
                        variant="secondary"
                      >
                        -{Math.round(discountPercent)}%
                      </Badge>
                    )}
                  </div>

                  <CardContent className="space-y-1 p-4">
                    <p className="text-xs text-muted-foreground">
                      {product.category?.name ?? "Uncategorized"}
                    </p>
                    <h2 className="line-clamp-2 text-sm font-semibold md:text-base">
                      {product.title}
                    </h2>
                    {hasDiscount ? (
                      <div className="pt-1">
                        <p className="text-xs text-muted-foreground line-through md:text-sm">
                          {formatCurrency(product.price)}
                        </p>
                        <p className="text-sm font-semibold md:text-base">
                          {formatCurrency(discountedPrice)}
                        </p>
                      </div>
                    ) : (
                      <p className="pt-1 text-sm font-semibold md:text-base">
                        {formatCurrency(product.price)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      {!isLoading && !errorMessage && (hasProducts || canGoPrevious) && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={getPageHref(currentPage - 1)}
                onClick={(event) => {
                  event.preventDefault();
                  if (canGoPrevious) {
                    goToPage(currentPage - 1);
                  }
                }}
                aria-disabled={!canGoPrevious}
                className={
                  !canGoPrevious ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>

            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href={getPageHref(1)}
                    onClick={(event) => {
                      event.preventDefault();
                      goToPage(1);
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  href={getPageHref(currentPage - 1)}
                  onClick={(event) => {
                    event.preventDefault();
                    goToPage(currentPage - 1);
                  }}
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={getPageHref(currentPage)} isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>

            {canGoNext && (
              <PaginationItem>
                <PaginationLink
                  href={getPageHref(currentPage + 1)}
                  onClick={(event) => {
                    event.preventDefault();
                    goToPage(currentPage + 1);
                  }}
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href={getPageHref(currentPage + 1)}
                onClick={(event) => {
                  event.preventDefault();
                  if (canGoNext) {
                    goToPage(currentPage + 1);
                  }
                }}
                aria-disabled={!canGoNext}
                className={
                  !canGoNext ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
