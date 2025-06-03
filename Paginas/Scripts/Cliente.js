var BaseURL = "http://inmobiliaria.runasp.net/";

jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaClientes();
});

function LlenarTablaClientes() {
    let URL = BaseURL + "api/Clientes/ConsultarTodos";
    LlenarTablaXServiciosAuth(URL, "#tblClientes");
}

async function EjecutarComando(Metodo, Funcion) {
    let URL = BaseURL + "api/Clientes/" + Funcion;

    // Construir el objeto cliente
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

    // Ejecutar el comando
    const Rpta = await EjecutarComandoServicioRptaAuth(Metodo, URL, cliente);
    LlenarTablaClientes();
}

async function Consultar() {
    let identificacion = $("#txtidentificacion").val();
    let URL = BaseURL + "api/Clientes/ConsultarXDocumento?identificacion=" + identificacion;

    const cliente = await ConsultarServicioAuth(URL);
    if (cliente != null) {
        $("#txtid_cliente").val(cliente.id_cliente);
        $("#txtidentificacion").val(cliente.identificacion);
        $("#txtnombres").val(cliente.nombres);
        $("#txtapellidos").val(cliente.apellidos);
        $("#txttelefono").val(cliente.telefono);
        $("#txtemail").val(cliente.email);
        $("#txtdireccion").val(cliente.direccion);
        $("#txtfecha_registro").val(cliente.fecha_registro);
        $("#dvMensaje").html("");
    } else {
        $("#dvMensaje").html("<div class='alert alert-warning'>El cliente no está en la base de datos</div>");
        $("#txtid_cliente").val("");
        $("#txtidentificacion").val("");
        $("#txtnombres").val("");
        $("#txtapellidos").val("");
        $("#txttelefono").val("");
        $("#txtemail").val("");
        $("#txtdireccion").val("");
        $("#txtfecha_registro").val("");
    }

}

class Cliente {
    constructor(id_cliente, identificacion, nombres, apellidos, telefono, email, direccion, fecha_registro) {
        this.id_cliente = id_cliente;
        this.identificacion = identificacion;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.fecha_registro = fecha_registro;
    }
}