const BaseURL = "http://inmobiliaria.runasp.net/api/Arriendos/";

$(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    cargarTablaArriendos();
});

function cargarTablaArriendos() {
    fetch(BaseURL + "ConsultarTodos")
        .then(response => response.json())
        .then(data => {
            $("#tblArriendos").DataTable({
                destroy: true,
                data: data,
                columns: [
                    { data: "id_arriendo" },
                    { data: "id_propiedad" },
                    { data: "id_inquilino" },
                    { data: "id_empleado" },
                    { data: "fecha_inicio", render: formatearFecha },
                    { data: "fecha_fin", render: data => data ? formatearFecha(data) : "" },
                    { data: "canon_mensual" },
                    { data: "deposito" },
                    {
                        data: null,
                        render: function (row) {
                            return `
                                <button class='btn btn-sm btn-danger' onclick='eliminarArriendoDesdeTabla(${row.id_arriendo})'>
                                    <i class='fas fa-trash'></i>
                                </button>`;
                        }
                    }
                ]
            });
        })
        .catch(error => alert("Error al cargar los arriendos: " + error));
}

function llenarFormularioArriendo(arriendo) {
    $("#txtid_arriendo").val(arriendo.id_arriendo);
    $("#txtid_propiedad").val(arriendo.id_propiedad);
    $("#txtid_inquilino").val(arriendo.id_inquilino);
    $("#txtid_empleado").val(arriendo.id_empleado);
    $("#txtfecha_inicio").val(arriendo.fecha_inicio.split("T")[0]);
    $("#txtfecha_fin").val(arriendo.fecha_fin ? arriendo.fecha_fin.split("T")[0] : "");
    $("#txtcanon_mensual").val(arriendo.canon_mensual);
    $("#txtdeposito").val(arriendo.deposito);
}

function EjecutarComandoArriendo(metodo, accion) {
    const arriendo = {
        id_arriendo: parseInt($("#txtid_arriendo").val()),
        id_propiedad: parseInt($("#txtid_propiedad").val()),
        id_inquilino: parseInt($("#txtid_inquilino").val()),
        id_empleado: parseInt($("#txtid_empleado").val()),
        fecha_inicio: $("#txtfecha_inicio").val(),
        fecha_fin: $("#txtfecha_fin").val() || null,
        canon_mensual: parseFloat($("#txtcanon_mensual").val()),
        deposito: $("#txtdeposito").val() ? parseFloat($("#txtdeposito").val()) : null
    };

    fetch(BaseURL + accion, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arriendo)
    })
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            limpiarFormularioArriendo();
            cargarTablaArriendos();
        })
        .catch(err => alert("Error al ejecutar operación: " + err));
}

function ConsultarArriendo() {
    const id = $("#txtid_arriendo").val();
    if (!id) {
        alert("Ingrese el ID del arriendo a consultar");
        return;
    }

    fetch(BaseURL + "ConsultarXId?IdArriendo=" + id)
        .then(res => res.json())
        .then(arriendo => {
            if (!arriendo) {
                alert("Arriendo no encontrado");
                return;
            }
            llenarFormularioArriendo(arriendo);
        })
        .catch(err => alert("Error al consultar: " + err));
}

function EliminarArriendoDesdeFormulario() {
    const id = $("#txtid_arriendo").val();
    if (!id) {
        alert("Ingrese el ID del arriendo a eliminar");
        return;
    }

    if (!confirm("¿Está seguro de eliminar este arriendo?")) return;

    fetch(BaseURL + "EliminarXId?IdArriendo=" + id, {
        method: "DELETE"
    })
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            limpiarFormularioArriendo();
            cargarTablaArriendos();
        })
        .catch(err => alert("Error al eliminar: " + err));
}

function eliminarArriendoDesdeTabla(id) {
    if (!confirm("¿Está seguro de eliminar este arriendo?")) return;

    fetch(BaseURL + "EliminarXId?IdArriendo=" + id, {
        method: "DELETE"
    })
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            cargarTablaArriendos();
        })
        .catch(err => alert("Error al eliminar: " + err));
}

function limpiarFormularioArriendo() {
    $("#frmArriendo")[0].reset();
}

function formatearFecha(fechaISO) {
    const date = new Date(fechaISO);
    return date.toISOString().split("T")[0];
}
