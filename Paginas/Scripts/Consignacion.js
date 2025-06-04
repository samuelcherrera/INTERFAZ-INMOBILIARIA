var BaseURL = "http://inmobiliaria.runasp.net/api/Consignaciones/";

$(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaConsignaciones();
});

function LlenarTablaConsignaciones() {
    $.get(BaseURL + "ConsultarTodos", function (data) {
        $("#tblConsignaciones").DataTable({
            data: data,
            destroy: true,
            columns: [
                { data: "id_consignacion" },
                { data: "id_propiedad" },
                { data: "id_propietario" },
                { data: "fecha_inicio" },
                { data: "fecha_fin" },
                { data: "porcentaje_comision" },
                {
                    data: "id_consignacion",
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
    const cons = new Consignacion(
        $("#txtid_consignacion").val(),
        $("#txtid_propiedad").val(),
        $("#txtid_propietario").val(),
        $("#txtfecha_inicio").val(),
        $("#txtfecha_fin").val(),
        $("#txtporcentaje_comision").val()
    );

    const url = BaseURL + accion;
    const opciones = {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cons)
    };

    try {
        const res = await fetch(url, opciones);
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaConsignaciones();
    } catch (error) {
        alert("Error al ejecutar operación: " + error);
    }
}

async function Consultar() {
    const id = $("#txtid_consignacion").val();
    if (!id) return alert("Por favor ingrese un ID de consignación.");

    const url = BaseURL + "ConsultarXId?id=" + id;

    try {
        const res = await fetch(url);
        if (!res.ok) return alert("Consignación no encontrada.");

        const cons = await res.json();
        $("#txtid_propiedad").val(cons.id_propiedad);
        $("#txtid_propietario").val(cons.id_propietario);
        $("#txtfecha_inicio").val(cons.fecha_inicio.split("T")[0]);
        $("#txtfecha_fin").val(cons.fecha_fin.split("T")[0]);
        $("#txtporcentaje_comision").val(cons.porcentaje_comision);
    } catch (error) {
        alert("Error al consultar la consignación: " + error);
    }
}

async function EliminarDesdeFormulario() {
    const id = $("#txtid_consignacion").val();
    if (!id) return alert("Debe ingresar el ID de la consignación a eliminar.");
    if (!confirm("¿Está seguro que desea eliminar esta consignación?")) return;

    const url = BaseURL + "EliminarXId?id=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaConsignaciones();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

async function EliminarPorId(id) {
    if (!confirm("¿Está seguro que desea eliminar esta consignación?")) return;

    const url = BaseURL + "EliminarXId?id=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaConsignaciones();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

class Consignacion {
    constructor(id_consignacion, id_propiedad, id_propietario, fecha_inicio, fecha_fin, porcentaje_comision) {
        this.id_consignacion = parseInt(id_consignacion);
        this.id_propiedad = parseInt(id_propiedad);
        this.id_propietario = parseInt(id_propietario);
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.porcentaje_comision = parseFloat(porcentaje_comision);
    }
}
