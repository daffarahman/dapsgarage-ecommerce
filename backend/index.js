import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to DapsGarage E-Commerce API" });
});

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

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
