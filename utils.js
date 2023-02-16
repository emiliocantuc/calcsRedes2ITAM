/**
 * Carga la tabla de entrada de la matriz de adyacencia en el documento.
 * @param {String} input_div_id El id del div en donde colocar la tabla.
 * @param {int} n_nodos El numero de nodos a ingresar.
 * @param {boolean} es_simetrica Si la matriz es simetrica o no.
 */
function loadMatrixInput(input_div_id,n_nodos,es_simetrica){

    // Div en donde colocamos la tabla
    let div=document.getElementById(input_div_id);

    // La tabla
    let tabla=document.createElement("table");
    tabla.id="tabla_input";

    // Agregamos encabezado para indicar no. de nodo
    let encabezado=document.createElement("tr");
    for(let i=0;i<n_nodos+1;i++){
        let casilla=document.createElement("th");
        casilla.innerHTML=i>0?(""+(i)):"";
        encabezado.appendChild(casilla);
    }
    tabla.appendChild(encabezado);


    // Para cada nodo
    for(let i=0;i<n_nodos;i++){
        // Agregamos un renglon en la tabla
        let renglon=document.createElement("tr");

        // Agregamos un encabezado (ahora horizontal) para indicar
        // el no. de nodo
        let casilla=document.createElement("th");
        casilla.innerHTML=""+(i+1);
        renglon.appendChild(casilla);

        // Y ahora para cada nodo agregamos una casilla al renglon
        for(let j=0;j<n_nodos;j++){

            // La casilla es tipo input
            let casilla=document.createElement("td");
            let casilla_input=document.createElement("input");

            // Tiene un id unico
            casilla_input.id=i+","+j;
            casilla_input.type="number";

            // El input es deshabilitado si esta en diagolan o
            // si la matriz es simetrica y i>j.
            casilla_input.disabled=(i==j) || (es_simetrica && i>j);

            // Si es simetrica replicamos su valor al complemento cada que cambia
            if(es_simetrica){
                casilla_input.addEventListener('change', (event) => {
                    let id_casilla_actual=event.target.id;
                    let valor_casilla_actual=event.target.value;
                    let id_casilla_complemento=id_casilla_actual.split(",").reverse().join(",");
                    document.getElementById(id_casilla_complemento).value=valor_casilla_actual;
                  });
            }
            casilla.appendChild(casilla_input);
            console.log(casilla_input.id);
            renglon.appendChild(casilla);
        }
        tabla.appendChild(renglon);
    }
    div.appendChild(tabla);
}

function llena_al_azar(n_nodos,es_simetrica,max){
    for(let i=0;i<n_nodos;i++){
        for(let j=0;j<n_nodos;j++){
            if((i==j) || (es_simetrica && i>j)) continue;
            document.getElementById(i+","+j).value=Math.floor(Math.random() * max);;
        }
    }
}

function llenar_de_arr(arr){
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++){
            document.getElementById(i+","+j).value=arr[i][j];
        }
    }
}


function get_matrix_from_input(n_nodos){
    let arr=[];
    for(let i=0;i<n_nodos;i++){
        let renglon=[];
        for(let j=0;j<n_nodos;j++){
            try{
                if(i==j){
                    renglon.push(0.0);
                }else{
                    let v=parseFloat(document.getElementById(i+","+j).value);
                    if(isNaN(v) || v<0){
                        alert("Valor invalido en casilla "+(i+1)+","+(j+1));
                        return NaN;
                    }else{
                        renglon.push(v);
                    }
                }
            }catch(e){
                alert("Valor invalido en casilla "+(i+1)+","+(j+1));
                return NaN;
            }
        }
        arr.push(renglon);
    }
    return arr;

}
