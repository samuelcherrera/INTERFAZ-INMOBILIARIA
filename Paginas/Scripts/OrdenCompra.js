var BaseURL = "http://inmobiliaria.runasp.net/api/OrdenCompra/";

$(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaOrdenes();
});

function LlenarTablaOrdenes() {
    $.get(BaseURL + "ConsultarTodas", function (data) {
        $("#tblOrdenes").DataTable({
            data: data,
            destroy: true,
            columns: [
                { data: "id_orden" },
                { data: "id_proveedor" },
                { data: "id_empleado" },
                {
                    data: "fecha_orden",
                    render: function (fecha) {
                        return new Date(fecha).toLocaleDateString();
                    }
                },
                { data: "total" },
                {
                    data: "id_orden",
                    render: function (id) {
                        return `<button class="btn btn-sm btn-danger" onclick="EliminarPorId('${id}')">
                                    <i class="fas fa-trash-alt"></i>
                                </button>`;
                    },
                    orderable: false
                }
            ]
        });
    });
}

async function EjecutarComando(metodo, accion) {
    const orden = new OrdenCompra(
        $("#txtid_orden").val(),
        $("#txtid_proveedor").val(),
        $("#txtid_empleado").val(),
        $("#txtfecha_orden").val(),
        $("#txttotal").val()
    );

    const url = BaseURL + accion;
    const opciones = {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orden)
    };

    try {
        const res = await fetch(url, opciones);
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaOrdenes();
        LimpiarFormulario();
    } catch (error) {
        alert("Error al ejecutar la operación: " + error);
    }
}

async function Consultar() {
    const id = $("#txtid_orden").val();
    if (!id) return alert("Por favor ingrese un ID de orden.");

    const url = BaseURL + "ConsultarPorId?id=" + id;

    try {
        const res = await fetch(url);
        if (!res.ok) return alert("Orden no encontrada.");

        const orden = await res.json();
        $("#txtid_orden").val(orden.id_orden);
        $("#txtid_proveedor").val(orden.id_proveedor);
        $("#txtid_empleado").val(orden.id_empleado);
        $("#txtfecha_orden").val(new Date(orden.fecha_orden).toISOString().split("T")[0]);
        $("#txttotal").val(orden.total);
    } catch (error) {
        alert("Error al consultar la orden: " + error);
    }
}

async function EliminarDesdeFormulario() {
    const id = $("#txtid_orden").val();
    if (!id) return alert("Debe ingresar el ID de la orden a eliminar.");

    if (!confirm("¿Está seguro que desea eliminar esta orden?")) return;

    const url = BaseURL + "EliminarPorId?id=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaOrdenes();
        LimpiarFormulario();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

async function EliminarPorId(id) {
    if (!confirm("¿Está seguro que desea eliminar esta orden?")) return;

    const url = BaseURL + "EliminarPorId?id=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaOrdenes();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

function LimpiarFormulario() {
    $("#txtid_orden").val("");
    $("#txtid_proveedor").val("");
    $("#txtid_empleado").val("");
    $("#txtfecha_orden").val("");
    $("#txttotal").val("");
    $("#dvMensaje").html("");
}

class OrdenCompra {
    constructor(id_orden, id_proveedor, id_empleado, fecha_orden, total) {
        this.id_orden = id_orden;
        this.id_proveedor = id_proveedor;
        this.id_empleado = id_empleado;
        this.fecha_orden = fecha_orden;
        this.total =total;
    }
}