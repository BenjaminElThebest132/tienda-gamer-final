import React from 'react';

export default function Blog() {
  return (
    <div className="container mt-5">
       <h2 className="text-center mb-5 text-white">Últimas Noticias</h2>
       
       <div className="row">
         {/* Artículo Falso 1 */}
         <div className="col-md-4">
           <div className="card mb-4">
             <div className="card-body">
               <span className="badge bg-primary mb-2">Hardware</span>
               <h5 className="card-title text-white">Las mejores gráficas del 2025</h5>
               <p className="card-text text-muted">Análisis completo de la nueva serie RTX 5000...</p>
               <button className="btn btn-sm btn-outline-light">Leer más</button>
             </div>
           </div>
         </div>

         {/* Artículo Falso 2 */}
         <div className="col-md-4">
           <div className="card mb-4">
             <div className="card-body">
               <span className="badge bg-success mb-2">Juegos</span>
               <h5 className="card-title text-white">Lanzamiento de GTA VI</h5>
               <p className="card-text text-muted">Todo lo que sabemos hasta ahora sobre el mapa...</p>
               <button className="btn btn-sm btn-outline-light">Leer más</button>
             </div>
           </div>
         </div>

         {/* Artículo Falso 3 */}
         <div className="col-md-4">
            <div className="card mb-4 opacity-50">
              <div className="card-body text-center py-5">
                <h5 className="text-muted">Más contenido pronto...</h5>
              </div>
            </div>
         </div>
       </div>
    </div>
  );
}