var BaseURL = "http://inmobiliaria.runasp.net/api/Ciudades/";

$(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaCiudades();
});

function LlenarTablaCiudades() {
    $.get(BaseURL + "ConsultarTodos", function (data) {
        $("#tblCiudades").DataTable({
            data: data,
            destroy: true,
            columns: [
                { data: "id_ciudad" },
                { data: "nombre" },
                { data: "departamento" },
                {
                    data: "id_ciudad",
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
    const ciudad = new Ciudad(
        $("#txtid_ciudad").val(),
        $("#txtnombre").val(),
        $("#txtdepartamento").val()
    );

    const url = BaseURL + accion;
    const opciones = {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ciudad)
    };

    try {
        const res = await fetch(url, opciones);
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaCiudades();
        LimpiarFormulario();
    } catch (error) {
        alert("Error al ejecutar la operación: " + error);
    }
}

async function Consultar() {
    const id = $("#txtid_ciudad").val();
    if (!id) return alert("Por favor ingrese un ID de ciudad.");

    const url = BaseURL + "ConsultarXId?id=" + id;

    try {
        const res = await fetch(url);
        if (!res.ok) return alert("Ciudad no encontrada.");

        const ciudad = await res.json();
        $("#txtid_ciudad").val(ciudad.id_ciudad);
        $("#txtnombre").val(ciudad.nombre);
        $("#txtdepartamento").val(ciudad.departamento);
    } catch (error) {
        alert("Error al consultar la ciudad: " + error);
    }
}

async function EliminarDesdeFormulario() {
    const id = $("#txtid_ciudad").val();
    if (!id) return alert("Debe ingresar el ID de la ciudad a eliminar.");

    if (!confirm("¿Está seguro que desea eliminar esta ciudad?")) return;

    const url = BaseURL + "EliminarXId?id=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaCiudades();
        LimpiarFormulario();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

async function EliminarPorId(id) {
    if (!confirm("¿Está seguro que desea eliminar esta ciudad?")) return;

    const url = BaseURL + "EliminarXId?id=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaCiudades();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

function LimpiarFormulario() {
    $("#txtid_ciudad").val("");
    $("#txtnombre").val("");
    $("#txtdepartamento").val("");
    $("#dvMensaje").html("");
}

class Ciudad {
    constructor(id_ciudad, nombre, departamento) {
        this.id_ciudad = id_ciudad;
        this.nombre = nombre;
        this.departamento = departamento;
    }
}
