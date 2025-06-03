var BaseURL = "http://inmobiliaria.runasp.net/";

jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaCiudades();
});

function LlenarTablaCiudades() {
    let URL = BaseURL + "api/Ciudades/ConsultarTodos";
    LlenarTablaXServiciosAuth(URL, "#tblCiudades");
}

async function EjecutarComando(Metodo, Funcion) {
    let URL = BaseURL + "api/Ciudades/" + Funcion;
    // Construye el objeto ciudad
    const ciudad = new Ciudad($("#txtid_ciudad").val(), $("#txtnombre").val(), $("#txtdepartamento").val());
    // Invoca el comando
    const Rpta = await EjecutarComandoServicioRptaAuth(Metodo, URL, ciudad);
    LlenarTablaCiudades();
}

async function Consultar() {
    let nombre = $("#txtid_ciudad").val();
    let URL = BaseURL + "api/Ciudades/ConsultarXId?id=" + nombre;
    const ciudad = await ConsultarServicioAuth(URL);
    if (ciudad != null) {
        $("#txtid_ciudad").val(ciudad.id_ciudad);
        $("#txtnombre").val(ciudad.nombre);
        $("#txtdepartamento").val(ciudad.departamento);
    } else {
        $("#dvMensaje").html("La ciudad no está en la base de datos");
        $("#txtid_ciudad").val("");
        $("#txtnombre").val("");
        $("#txtdepartamento").val("");
    }
}

class Ciudad {
    constructor(id_ciudad, nombre, departamento) {
        this.id_ciudad = id_ciudad;
        this.nombre = nombre;
        this.departamento = departamento;
    }
}
