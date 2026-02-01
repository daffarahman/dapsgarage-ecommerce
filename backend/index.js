import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";
import { authenticateToken } from "./middleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to DapsGarage E-Commerce API" });
});

/* AUTH */
app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, password, full_name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase.from("profiles").insert({
            email: email,
            password_hash: hashedPassword,
            full_name: full_name,
        });

        if (error) {
            throw error;
        }

        res.json({
            message: "User registered successfully"
        });
    } catch (error) {
        if (error.code === "23505") {
            error.message = "Email already exists";
        }
        res.status(500).json(error);
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Search user
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", email)
            .single();


        // Check password
        if (!data || !data.password_hash) {
            throw {
                message: "Email did NOT found!"
            };
        }

        const isPasswordValid = await bcrypt.compare(password, data.password_hash);

        if (!isPasswordValid) {
            throw {
                message: "Invalid password!"
            };
        }

        const token = jwt.sign(
            { id: data.id, email: data.email, full_name: data.full_name },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login success!",
            user: data,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

app.get("/api/auth/me", authenticateToken, (req, res) => {
    res.json(req.user);
});

/* API FOR DATA */
app.get("/api/platforms", async (req, res) => {
    try {
        const { data, error } = await supabase.from("platforms").select("*");

        if (error) {
            throw error;
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/platforms/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from("platforms").select("*").eq("id", id).single();

        if (error) {
            throw error;
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/products", async (req, res) => {
    const { platform } = req.query;
    try {
        if (platform) {
            const { data: platformData, error: platformError } = await supabase
                .from("platforms")
                .select("id")
                .eq("slug", platform)
                .single();

            if (platformError) {
                if (platformError.code === "PGRST116") {
                    return res.status(404).json({ error: "Platform not found" });
                }
                throw platformError;
            }

            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("platform_id", platformData.id)
                .order("stock", { ascending: false });

            if (error) {
                throw error;
            }

            return res.json(data);
        }

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("stock", { ascending: false });

        if (error) {
            throw error;
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

        if (error) {
            throw error;
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get("/api/profile/cart", authenticateToken, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("cart")
            // lu jangan lupa join yak dari materi basdat wkwkkwkw
            .select(`
                *,
                product:product_id (
                    title,
                    price,
                    image_url,
                    stock,
                    discount,
                    platform:platform_id (
                        id,
                        name,
                        slug
                    )
                )
            `)
            .eq("profile_id", req.user.id)
            .order("created_at")

        if (error) {
            throw error;
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/profile/cart", authenticateToken, async (req, res) => {
    try {
        const { product_id, profile_id, quantity } = req.body;

        const { error } = await supabase.from("cart").insert({
            product_id: product_id,
            profile_id: profile_id,
            quantity: quantity,
        });

        if (error) {
            throw error;
        }

        res.json({
            message: "Item added to cart successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.delete("/api/profile/cart/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from("cart").delete().eq("id", id);

        if (error) {
            throw error;
        }

        res.json({
            message: "Item deleted from cart successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
