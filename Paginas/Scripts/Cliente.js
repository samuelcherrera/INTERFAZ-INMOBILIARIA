var BaseURL = "http://inmobiliaria.runasp.net/";

jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaClientes();
});

function LlenarTablaClientes() {
    const URL = BaseURL + "api/Clientes/ConsultarTodos";

    $.get(URL, function (data) {
        $("#tblClientes").DataTable({
            data: data,
            destroy: true,
            columns: [
                { data: "id_cliente" },
                { data: "identificacion" },
                { data: "nombres" },
                { data: "apellidos" },
                { data: "telefono" },
                { data: "email" },
                { data: "direccion" },
                {
                    data: "fecha_registro",
                    render: function (data) {
                        return new Date(data).toLocaleDateString();
                    }
                },
                {
                    data: "identificacion",
                    render: function (id) {
                        return `<button class="btn btn-sm btn-danger" onclick="EliminarPorId(${id})">
                            <i class="fas fa-trash-alt"></i></button>`;
                    },
                    orderable: false
                }
            ]
        });
    });
}

async function EjecutarComando(metodo, accion) {
    const cliente = new Cliente(
        $("#txtid_cliente").val(),
        $("#txtidentificacion").val(),
        $("#txtnombres").val(),
        $("#txtapellidos").val(),
        $("#txttelefono").val(),
        $("#txtemail").val(),
        $("#txtdireccion").val(),
        $("#txtfecha_registro").val()
    );

    const url = BaseURL + "api/Clientes/" + accion;

    try {
        const res = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });

        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaClientes();
    } catch (error) {
        alert("Error al realizar la operación: " + error);
    }
}

async function Consultar() {
    const identificacion = $("#txtidentificacion").val();
    const url = BaseURL + "api/Clientes/ConsultarXDocumento?identificacion=" + identificacion;

    try {
        const res = await fetch(url);
        if (res.ok) {
            const cliente = await res.json();
            $("#txtid_cliente").val(cliente.id_cliente);
            $("#txtidentificacion").val(cliente.identificacion);
            $("#txtnombres").val(cliente.nombres);
            $("#txtapellidos").val(cliente.apellidos);
            $("#txttelefono").val(cliente.telefono);
            $("#txtemail").val(cliente.email);
            $("#txtdireccion").val(cliente.direccion);
            $("#txtfecha_registro").val(cliente.fecha_registro.split("T")[0]);
            $("#dvMensaje").html("");
        } else {
            $("#dvMensaje").html("El cliente no se encontró en la base de datos.");
        }
    } catch (error) {
        $("#dvMensaje").html("Error al consultar cliente: " + error);
    }
}

async function EliminarDesdeFormulario() {
    const id = $("#txtidentificacion").val();
    if (!id) {
        alert("Por favor ingresa el ID del cliente a eliminar.");
        return;
    }

    if (!confirm("¿Estás seguro de eliminar este cliente?")) return;

    const url = BaseURL + "api/Clientes/EliminarXDocumento?identificacion=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaClientes();
    } catch (error) {
        alert("Error al eliminar cliente: " + error);
    }
}

async function EliminarPorId(id) {
    if (!confirm("¿Deseas eliminar este cliente?")) return;

    const url = BaseURL + "api/Clientes/EliminarXDocumento?identificacion=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaClientes();
    } catch (error) {
        alert("Error al eliminar cliente: " + error);
    }
}

class Cliente {
    constructor(id, identificacion, nombres, apellidos, telefono, email, direccion, fecha_registro) {
        this.id_cliente = parseInt(id);
        this.identificacion = identificacion;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.fecha_registro = fecha_registro;
    }
}