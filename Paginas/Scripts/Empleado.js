var BaseURL = "http://inmobiliaria.runasp.net/";
jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaEmpleados();
});

function LlenarTablaEmpleados() {
    let URL = BaseURL + "api/Empleados/ConsultarTodos";
    LlenarTablaXServiciosAuth(URL, "#tblEmpleados");
}
async function EjecutarComando(Metodo, Funcion) {
    let URL = BaseURL + "api/Empleados/" + Funcion;
    //Se construye el objeto empleado
    const empleado = new Empleado($("#txtid_empleado").val(), $("#txtidentificacion").val(), $("#txtnombres").val(), $("#txtapellidos").val(),
        $("#txttelefono").val(), $("#txtemail").val(), $("#txtdireccion").val(), $("#txtcargo").val(), $("#txtfecha_ingreso").val(), $("#txtsalario").val(), $("#txtsede_id").val(), $("#txtusuario").val(), $("#txtclave").val());
    //Invoca el comando para ejecutar
    const Rpta = await EjecutarComandoServicioRptaAuth(Metodo, URL, empleado);
    LlenarTablaEmpleados();
}
async function Consultar() {
    let Documento = $("#txtidentificacion").val();
    let URL = BaseURL + "api/Empleados/ConsultarXDocumento?identificacion=" + Documento;
    const empleado = await ConsultarServicioAuth(URL);
    if (empleado != null) {


        $("#txtid_empleado").val(empleado.id_empleado);
        $("#txtnombres").val(empleado.nombres);
        $("#txtapellidos").val(empleado.apellidos);
        $("#txttelefono").val(empleado.telefono);
        $("#txtemail").val(empleado.email);
        $("#txtdireccion").val(empleado.direccion);
        $("#txtcargo").val(empleado.cargo);
        $("#txtfecha_ingreso").val(empleado.fecha_ingreso.split('T')[0]);
        $("#txtsalario").val(empleado.salario);
        $("#txtsede_id").val(empleado.sede_id);
        $("#txtusuario").val(empleado.usuario);
        $("#txtclave").val(empleado.clave);
       
    }
    else {
        $("#dvMensaje").html("El empleado no está en la base de datos");
        $("#txtnombres").val("");
        $("#txtapellidos").val("");
        $("#txttelefono").val("");
        $("#txtemail").val("");
        $("#txtdireccion").val("");
        $("#txtcargo").val("");
        $("#txtfecha_ingreso").val("");
        $("#txtsalario").val("");
        $("#txtsede_id").val("");
        $("#txtusuario").val("");
        $("#txtclave").val("");
    }
}
class Empleado {
    constructor(id_empleado,identificacion, nombres,apellidos, telefono, email, direccion, cargo, fecha_ingreso,salario,sede_id, usuario, clave) {
        this.id_empleado = id_empleado;
        this.identificacion = identificacion;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.cargo = cargo;
        this.fecha_ingreso = fecha_ingreso;
        this.salario = salario;
        this.sede_id = sede_id;
        this.usuario = usuario;
        this.clave = clave;

    }
}