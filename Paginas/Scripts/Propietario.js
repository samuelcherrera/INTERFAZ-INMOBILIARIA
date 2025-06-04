var BaseURL = "http://inmobiliaria.runasp.net/api/propietarios/";

$(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaPropietarios();
});

function LlenarTablaPropietarios() {
    $.get(BaseURL + "ConsultarTodas", function (data) {
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
                { data: "direccion" }
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
        alert("Error al ejecutar la operación: " + error);
    }
}

async function Consultar() {
    const id = $("#txtid_persona").val();
    if (!id) return alert("Por favor ingrese un ID de persona.");

    const url = BaseURL + "ConsultarPorId?id=" + id;

    try {
        const res = await fetch(url);
        if (!res.ok) return alert("Propietario no encontrado.");

        const propietario = await res.json();
        $("#txtidentificacion").val(propietario.identificacion);
        $("#txtnombres").val(propietario.nombres);
        $("#txtapellidos").val(propietario.apellidos);
        $("#txttelefono").val(propietario.telefono);
        $("#txtemail").val(propietario.email);
        $("#txtdireccion").val(propietario.direccion);
    } catch (error) {
        alert("Error al consultar el propietario: " + error);
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
