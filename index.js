// Importamos las dependencias necesarias

import express from 'express';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express(); 
app.use(express.json()); 
const port = 3000; 

const uri = process.env.MONGO_DB_URI; 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,       
    strict: true,
    deprecationErrors: true,
    }
}); 


const conectDB = async (req, res, next) => {  //middleware para conectar a la base de datos
    try {
        await client.connect(); 
        req.db = client.db('craft_beer'); 
        req.products= req.db.collection('products'); 
        console.log('Midlleware: Conexión a MongoDB establecida'); 
            next(); 
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message); 
        res.status(500).json({ success: false, error:"Error al conectar a MongoDB" });
    }
};

// Middleware para cerrar la conexión a la base de datos después de cada solicitud
const closeDB = (req, res, next) => {
    res.on('finish', async () => { 
    try {
        await client.close(); 
        console.log('Midlleware: Conexión a MongoDB cerrada'); 
    } catch (error) {
        console.error('Error al cerrar la conexión a MongoDB:', error.message); 
    }
    })
    next(); 
};
// Configuracion del Get
app.get('/products', conectDB, closeDB, async (req, res) => { 
    try {
        const list = await req.products.find({}).toArray(); 
        res.json({ success: true, data: list }); 
    } catch (error) {
        res.status(500).json({ success: false, error: "Error al obtener los productos" }); consulta
    }
})

// Configuracion del Post  
app.post('/products', conectDB, closeDB, async (req, res) => { 
    try {
        const result = await req.products.insertOne(req.body); 
        res.json({ success: true, message: "Producto Creado", insertedID: result.insertedID }) 
    } catch (error) {
        res.status(500).json({ success: false, error: "Error al crear el producto" }); 
    }
});

// Configuracion del Put
app.put('/products/:id', conectDB, closeDB, async (req, res) => { 
    try {
        const result = await req.products.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body }); 
        if (result.matchedCount === 0) { 
            return res.status(404).json({ success: false, error: "Producto no encontrado" }); 
        }
        res.json({ success: true, message: "Producto actualizado", modifiedCount: result.modifiedCount }); 
    } catch (error) {
        res.status(500).json({ success: false, error: error.message }); 
        
    }
}); 

// Configuracion del Delete
    
app.delete('/products/:id', conectDB, closeDB, async (req, res) => { 
    try {
        // Usamos deleteOne y solo pasamos el filtro del ID
        const result = await req.products.deleteOne({ _id: new ObjectId(req.params.id) }); 
        
        if (result.deletedCount === 0) { 
            return res.status(404).json({ success: false, error: "Producto no encontrado para eliminar" }); 
        }else{
        res.json({ success: true, message: "Producto eliminado correctamente" }); 
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message }); 
    }
});

app.listen(port, () => { // iniciamos el servidor en el puerto especificado
    console.log(`Servidor CRUD escuchando en http://localhost:${port}`); // mensaje de éxito al iniciar el servidor
    console.log ('Endpoints disponibles:'); // mensaje para mostrar los endpoints disponibles
    console.log(`GET /products - Obtener todos los productos`); // endpoint para obtener todos los productos
    console.log(`POST /products - Crear un nuevo producto`); // endpoint para crear un nuevo producto
    console.log(`PUT /products/:id - Actualizar un producto por ID`); // endpoint para actualizar un producto por su ID
    console.log(`DELETE /products/:id - Eliminar un producto por ID`); // endpoint para eliminar un producto por su ID  
});