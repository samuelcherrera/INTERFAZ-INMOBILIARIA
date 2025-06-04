var BaseURL = "http://inmobiliaria.runasp.net/";

jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaPropiedades();
});

function LlenarTablaPropiedades() {
    let URL = BaseURL + "api/Propiedades/ConsultarTodas";
    $.get(URL, function (data) {
        $("#tblPropiedades").DataTable({
            data: data,
            destroy: true,
            columns: [
                { data: "id_propiedad" },
                { data: "titulo" },
                { data: "descripcion" },
                { data: "id_tipo_propiedad" },
                { data: "area_m2" },
                { data: "habitaciones" },
                { data: "banos" },
                { data: "parqueaderos" },
                { data: "anio_construccion" },
                { data: "direccion" },
                { data: "id_ciudad" },
                { data: "precio_venta" },
                { data: "precio_arriendo" },
                { data: "id_estado_propiedad" },
                { data: "fecha_registro" },
                {
                    data: "id_propiedad",
                    render: function (data) {
                        return `<button class="btn btn-sm btn-danger" onclick="EliminarPorId(${data})">
                            <i class="fas fa-trash-alt"></i></button>`;
                    },
                    orderable: false
                }
            ]
        });
    });
}

async function EjecutarComando(metodo, accion) {
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

    const url = BaseURL + "api/Propiedades/" + accion;

    const opciones = {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propiedad)
    };

    try {
        const res = await fetch(url, opciones);
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaPropiedades();
    } catch (error) {
        alert("Error al realizar la operación: " + error);
    }
}

async function Consultar() {
    const id = $("#txtid_propiedad").val();
    const url = BaseURL + "api/Propiedades/ConsultarPorId?id=" + id;

    try {
        const res = await fetch(url);
        if (res.ok) {
            const propiedad = await res.json();
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
            alert("No se encontró la propiedad");
        }
    } catch (error) {
        alert("Error al consultar la propiedad: " + error);
    }
}

async function EliminarDesdeFormulario() {
    const id = $("#txtid_propiedad").val();
    if (!id) {
        alert("Por favor ingrese el ID de la propiedad a eliminar.");
        return;
    }

    if (!confirm("¿Estás seguro de eliminar esta propiedad?")) return;

    const url = BaseURL + "api/Propiedades/EliminarPorId?id=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaPropiedades();
    } catch (error) {
        alert("Error al eliminar la propiedad: " + error);
    }
}

async function EliminarPorId(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar esta propiedad?")) {
        return;
    }

    const url = BaseURL + "api/Propiedades/EliminarPorId?id=" + id;

    try {
        const res = await fetch(url, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaPropiedades();
    } catch (error) {
        alert("Error al eliminar la propiedad: " + error);
    }
}

class Propiedad {
    constructor(id, titulo, descripcion, tipo, area, habitaciones, banos, parqueaderos, anio, direccion, ciudad, venta, arriendo, estado, fecha_registro) {
        this.id_propiedad = parseInt(id);
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.id_tipo_propiedad = parseInt(tipo);
        this.area_m2 = parseFloat(area);
        this.habitaciones = parseInt(habitaciones);
        this.banos = parseInt(banos);
        this.parqueaderos = parseInt(parqueaderos);
        this.anio_construccion = parseInt(anio);
        this.direccion = direccion;
        this.id_ciudad = parseInt(ciudad);
        this.precio_venta = parseFloat(venta);
        this.precio_arriendo = parseFloat(arriendo);
        this.id_estado_propiedad = parseInt(estado);
        this.fecha_registro = fecha_registro;
    }
}