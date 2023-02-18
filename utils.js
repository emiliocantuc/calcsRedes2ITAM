/**
 * Carga la tabla de entrada de la matriz de adyacencia en el documento.
 * @param {String} input_div_id El id del div en donde colocar la tabla.
 * @param {int} n_nodos El numero de nodos a ingresar.
 * @param {boolean} es_simetrica Si la matriz es simetrica o no.
 */
function despliega_matriz_entrada(input_div_id,n_nodos,es_simetrica){

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
            renglon.appendChild(casilla);
        }
        tabla.appendChild(renglon);
    }
    div.appendChild(tabla);
}

/**
 * Actualiza las dimensiones y casillas habilitadas de la matriz de entrada.
 * Se llamda cada que cambia el numero de nodos o si es simetrica.
 */
function update_matrix_input(){
    // Borramos todos los hijos antes de agregar
    document.getElementById("matrix_input").innerHTML="";

    let es_simetrica=document.getElementById("simetric_matrix").checked;
    try{
        let n_nodos=parseInt(document.getElementById("n_nodos_input").value);
        if(n_nodos<=0){
            alert("Ingresa un entero positivo para el # de nodos");
            return null;
        }

        despliega_matriz_entrada("matrix_input",n_nodos,es_simetrica);
    }catch(e){
        alert("Ingresa un entero positivo para el # de nodos");
    }
}

/**
 * Llena matriz de entrada con enteros al azar en el rango
 * [0,n_nodos].
 */
function llena_al_azar(){
    let es_simetrica=document.getElementById("simetric_matrix").checked;
    let n_nodos=parseInt(document.getElementById("n_nodos_input").value);
    let max=n_nodos;

    for(let i=0;i<n_nodos;i++){
        for(let j=0;j<n_nodos;j++){
            if((i==j) || (es_simetrica && i>j)) continue;
            document.getElementById(i+","+j).value=Math.floor(Math.random() * max);;
        }
    }
}

/**
 * Llena matriz de entrada con los valores de un arreglo
 * @param {Array} arr Arreglo con valores con los cuales llenar
 */
function llenar_de_arr(arr){
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++){
            document.getElementById(i+","+j).value=arr[i][j];
        }
    }
}

/**
 * Lee, parsea y regresa la matriz de entrada.
 * @param {int} n_nodos El numero de nodos
 * @returns {Array} La matriz parseada a floatantes.
 */
function cargar_matriz_de_entrada(n_nodos){
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
                        return null;
                    }else{
                        renglon.push(v);
                    }
                }
            }catch(e){
                alert("Valor invalido en casilla "+(i+1)+","+(j+1));
                return null;
            }
        }
        arr.push(renglon);
    }
    return arr;
}

function genera_tabla(encabezado,arr,titulo,encabezado_vertical){
    let tabla=document.createElement("table");

    // Titulo
    if(titulo!==undefined){
        let cap=document.createElement("caption");
        cap.innerHTML=titulo;
        tabla.appendChild(cap);
    }
    // Encabezado
    if(encabezado!==undefined){
        let renglon=document.createElement("tr");
        if(encabezado_vertical!==undefined){
            let th=document.createElement("th");
            th.innerHTML="";
            renglon.appendChild(th);
        }
        for(let e of encabezado){
            let th=document.createElement("th");
            th.innerHTML=e;
            renglon.appendChild(th);
        }
        tabla.appendChild(renglon);
    }
    // Cuerpo
    for(let i=0;i<arr.length;i++){
        let renglon=document.createElement("tr");

        // Encabezado horizontal
        if(encabezado_vertical!==undefined){
            let th=document.createElement("th");
            th.innerHTML=encabezado_vertical[i];
            renglon.appendChild(th);
        }

        for(let j=0;j<arr[i].length;j++){
            let td=document.createElement("td");
            td.innerHTML=arr[i][j];
            renglon.appendChild(td);
        }
        tabla.appendChild(renglon);
    }
    return tabla;
}

function highlight_celdas(celdas){
    for([i,j] of celdas){
        document.getElementById(i+","+j).class="highlighted";
    }
}

function matriz_de_ceros(rows,cols){
    let arr=[];
    for(let i=0;i<rows;i++){
        arr[i]=[];
        for(let j=0;j<cols;j++){
            arr[i][j]=0;
        }
    }
    return arr;
}

function quita_de_lista(arr,elem){
    let index = arr.indexOf(elem);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

