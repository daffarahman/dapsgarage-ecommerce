const idrCurrencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

export function formatCurrency(value: number): string {
    return idrCurrencyFormatter.format(value);
}
