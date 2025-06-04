var BaseURL = "http://inmobiliaria.runasp.net/api/Ventas/";

$(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaVentas();
});

function LlenarTablaVentas() {
    $.get(BaseURL + "ConsultarTodos", function (data) {
        $("#tblVentas").DataTable({
            data: data,
            destroy: true,
            columns: [
                { data: "id_venta" },
                { data: "id_propiedad" },
                { data: "id_cliente" },
                { data: "id_empleado" },
                { data: "fecha_venta" },
                { data: "precio_final" },
                { data: "comision" },
                {
                    data: "id_venta",
                    render: function (id) {
                        return `<button class="btn btn-sm btn-danger" onclick="EliminarPorId(${id})">
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
    const venta = new Venta(
        $("#txtid_venta").val(),
        $("#txtid_propiedad").val(),
        $("#txtid_cliente").val(),
        $("#txtid_empleado").val(),
        $("#txtfecha_venta").val(),
        $("#txtprecio_final").val(),
        $("#txtcomision").val()
    );

    const url = BaseURL + accion;
    const opciones = {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(venta)
    };

    try {
        const res = await fetch(url, opciones);
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaVentas();
    } catch (error) {
        alert("Error al ejecutar operación: " + error);
    }
}

async function Consultar() {
    const id = $("#txtid_venta").val();
    if (!id) return alert("Por favor ingrese un ID de venta.");

    const url = BaseURL + "ConsultarXId?IdVenta=" + id;

    try {
        const res = await fetch(url);
        if (!res.ok) return alert("Venta no encontrada.");

        const venta = await res.json();
        $("#txtid_propiedad").val(venta.id_propiedad);
        $("#txtid_cliente").val(venta.id_cliente);
        $("#txtid_empleado").val(venta.id_empleado);
        $("#txtfecha_venta").val(venta.fecha_venta);
        $("#txtprecio_final").val(venta.precio_final);
        $("#txtcomision").val(venta.comision);
    } catch (error) {
        alert("Error al consultar la venta: " + error);
    }
}

async function EliminarDesdeFormulario() {
    const id = $("#txtid_venta").val();
    if (!id) return alert("Debe ingresar el ID de la venta a eliminar.");

    if (!confirm("¿Está seguro que desea eliminar esta venta?")) return;

    const url = BaseURL + "EliminarXId?IdVenta=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaVentas();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

async function EliminarPorId(id) {
    if (!confirm("¿Está seguro que desea eliminar esta venta?")) return;

    const url = BaseURL + "EliminarXId?IdVenta=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaVentas();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

class Venta {
    constructor(id_venta, id_propiedad, id_cliente, id_empleado, fecha_venta, precio_final, comision) {
        this.id_venta = parseInt(id_venta);
        this.id_propiedad = parseInt(id_propiedad);
        this.id_cliente = parseInt(id_cliente);
        this.id_empleado = parseInt(id_empleado);
        this.fecha_venta = fecha_venta;
        this.precio_final = parseFloat(precio_final);
        this.comision = parseFloat(comision);
    }
}
