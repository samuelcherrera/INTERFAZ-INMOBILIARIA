var BaseURL = "http://inmobiliaria.runasp.net/";

jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaVentas();
});

function LlenarTablaVentas() {
    let URL = BaseURL + "api/Ventas/ConsultarTodos";
    LlenarTablaXServiciosAuth(URL, "#tblVentas");
}

async function EjecutarComando(Metodo, Funcion) {
    let URL = BaseURL + "api/Ventas/" + Funcion;

    // Construye el objeto venta
    const venta = new Venta(
        $("#txtid_venta").val(),
        $("#txtid_propiedad").val(),
        $("#txtid_cliente").val(),
        $("#txtid_empleado").val(),
        $("#txtfecha_venta").val(),
        $("#txtprecio_final").val(),
        $("#txtcomision").val()
    );

    // Invoca el comando
    const Rpta = await EjecutarComandoServicioRptaAuth(Metodo, URL, venta);
    LlenarTablaVentas();
}

async function Consultar() {
    let id = $("#txtid_venta").val();
    let URL = BaseURL + "api/Ventas/ConsultarXId?IdVenta=" + id;

    const venta = await ConsultarServicioAuth(URL);

    if (venta != null) {
        $("#txtid_venta").val(venta.id_venta);
        $("#txtid_propiedad").val(venta.id_propiedad);
        $("#txtid_cliente").val(venta.id_cliente);
        $("#txtid_empleado").val(venta.id_empleado);
        $("#txtfecha_venta").val(venta.fecha_venta);
        $("#txtprecio_final").val(venta.precio_final);
        $("#txtcomision").val(venta.comision);
    } else {
        $("#dvMensaje").html("La venta no está en la base de datos");
        $("#txtid_venta").val("");
        $("#txtid_propiedad").val("");
        $("#txtid_cliente").val("");
        $("#txtid_empleado").val("");
        $("#txtfecha_venta").val("");
        $("#txtprecio_final").val("");
        $("#txtcomision").val("");
    }
}

// Clase correcta para Venta
class Venta {
    constructor(id_venta, id_propiedad, id_cliente, id_empleado, fecha_venta, precio_final, comision) {
        this.id_venta = id_venta;
        this.id_propiedad = id_propiedad;
        this.id_cliente = id_cliente;
        this.id_empleado = id_empleado;
        this.fecha_venta = fecha_venta;
        this.precio_final = precio_final;
        this.comision = comision;
    }
}
