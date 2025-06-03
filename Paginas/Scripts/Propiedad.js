var BaseURL = "http://inmobiliaria.runasp.net/";

jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaPropiedades();
});

function LlenarTablaPropiedades() {
    let URL = BaseURL + "api/Propiedades/ConsultarTodas";
    LlenarTablaXServiciosAuth(URL, "#tblPropiedades");
}

async function EjecutarComando(metodo, funcion) {
    let URL = BaseURL + "api/Propiedades/" + funcion;

    const propiedad = new Propiedad(
        $("#txtid_propiedad").val(),
        $("#txttitulo").val(),
        $("#txtdescripcion").val(),
        $("#txtid_tipo_propiedad").val(),
        $("#txtarea_m2").val(),
        $("#txthabitaciones").val(),
        $("#txtbanos").val(),
        $("#txtparqueaderos").val(),
        $("#txtanio_construccion").val(),
        $("#txtdireccion").val(),
        $("#txtid_ciudad").val(),
        $("#txtprecio_venta").val(),
        $("#txtprecio_arriendo").val(),
        $("#txtid_estado_propiedad").val(),
        $("#txtfecha_registro").val()
    );

    const Rpta = await EjecutarComandoServicioRptaAuth(metodo, URL, propiedad);
    LlenarTablaPropiedades();
}

async function Consultar() {
    let id = $("#txtid_propiedad").val();
    let URL = BaseURL + "api/Propiedades/ConsultarPorId?id=" + id;

    const propiedad = await ConsultarServicioAuth(URL);
    if (propiedad != null) {
        $("#txtid_propiedad").val(propiedad.id_propiedad);
        $("#txttitulo").val(propiedad.titulo);
        $("#txtdescripcion").val(propiedad.descripcion);
        $("#txtid_tipo_propiedad").val(propiedad.id_tipo_propiedad);
        $("#txtarea_m2").val(propiedad.area_m2);
        $("#txthabitaciones").val(propiedad.habitaciones);
        $("#txtbanos").val(propiedad.banos);
        $("#txtparqueaderos").val(propiedad.parqueaderos);
        $("#txtanio_construccion").val(propiedad.anio_construccion);
        $("#txtdireccion").val(propiedad.direccion);
        $("#txtid_ciudad").val(propiedad.id_ciudad);
        $("#txtprecio_venta").val(propiedad.precio_venta);
        $("#txtprecio_arriendo").val(propiedad.precio_arriendo);
        $("#txtid_estado_propiedad").val(propiedad.id_estado_propiedad);
        $("#txtfecha_registro").val(propiedad.fecha_registro);
       
    } else {
        $("#dvMensaje").html("La propiedad no está registrada");
        $("#txtid_propiedad").val("");
        $("#txttitulo").val("");
        $("#txtdescripcion").val("");
        $("#txtid_tipo_propiedad").val("");
        $("#txtarea_m2").val("");
        $("#txthabitaciones").val("");
        $("#txtbanos").val("");
        $("#txtparqueaderos").val("");
        $("#txtanio_construccion").val("");
        $("#txtdireccion").val("");
        $("#txtid_ciudad").val("");
        $("#txtprecio_venta").val("");
        $("#txtprecio_arriendo").val("");
        $("#txtid_estado_propiedad").val("");
        $("#txtfecha_registro").val("");
    }
}

class Propiedad {
    constructor(id, titulo, descripcion, tipo, area, habitaciones, banos, parqueaderos, anio, direccion, ciudad, venta, arriendo, estado, fecha_registro) {
        this.id_propiedad = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.id_tipo_propiedad = tipo;
        this.area_m2 = area;
        this.habitaciones = habitaciones;
        this.banos = banos;
        this.parqueaderos = parqueaderos;
        this.anio_construccion = anio;
        this.direccion = direccion;
        this.id_ciudad = ciudad;
        this.precio_venta = venta;
        this.precio_arriendo = arriendo;
        this.id_estado_propiedad = estado;
        this.fecha_registro = fecha_registro;
    }
}