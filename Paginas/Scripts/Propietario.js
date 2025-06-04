var BaseURL = "http://inmobiliaria.runasp.net/api/propietarios/";

$(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaPropietarios();
});

function LlenarTablaPropietarios() {
    $.get(BaseURL + "ConsultarTodos", function (data) {
        $("#tblPropietarios").DataTable({
            data: data,
            destroy: true,
            columns: [
                { data: "id_persona" },
                { data: "identificacion" },
                { data: "nombres" },
                { data: "apellidos" },
                { data: "telefono" },
                { data: "email" },
                { data: "direccion" },
                {
                    data: "identificacion",
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
    const propietario = new Propietario(
        $("#txtid_persona").val(),
        $("#txtidentificacion").val(),
        $("#txtnombres").val(),
        $("#txtapellidos").val(),
        $("#txttelefono").val(),
        $("#txtemail").val(),
        $("#txtdireccion").val()
    );

    const url = BaseURL + accion;
    const opciones = {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propietario)
    };

    try {
        const res = await fetch(url, opciones);
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaPropietarios();
    } catch (error) {
        alert("Error al ejecutar operación: " + error);
    }
}

async function Consultar() {
    const id = $("#txtidentificacion").val();
    if (!id) return alert("Por favor ingrese un su identificacion.");

    const url = BaseURL + "ConsultarXDocumento?identificacion=" + id;

    try {
        const res = await fetch(url);
        if (!res.ok) return alert("Propietario no encontrado.");

        const p = await res.json();
        $("#txtid_persona").val(p.id_persona);
        $("#txtidentificacion").val(p.identificacion);
        $("#txtnombres").val(p.nombres);
        $("#txtapellidos").val(p.apellidos);
        $("#txttelefono").val(p.telefono);
        $("#txtemail").val(p.email);
        $("#txtdireccion").val(p.direccion);
    } catch (error) {
        alert("Error al consultar: " + error);
    }
}

async function EliminarDesdeFormulario() {
    const id = $("#txtidentificacion").val();
    if (!id) return alert("Debe ingresar la identificacion a eliminar.");

    if (!confirm("¿Está seguro que desea eliminar este propietario?")) return;

    const url = BaseURL + "EliminarXDocumento?identificacion=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaPropietarios();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

async function EliminarPorId(id) {
    if (!confirm("¿Está seguro que desea eliminar este propietario?")) return;

    const url = BaseURL + "EliminarXDocumento?identificacion=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaPropietarios();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

class Propietario {
    constructor(id_persona, identificacion, nombres, apellidos, telefono, email, direccion) {
        this.id_persona = parseInt(id_persona);
        this.identificacion = identificacion;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
    }
}