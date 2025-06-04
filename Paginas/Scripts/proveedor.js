const BaseURL = "http://inmobiliaria.runasp.net/api/Proveedores/";

$(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaProveedores();
});

function LlenarTablaProveedores() {
    $.get(BaseURL + "ConsultarTodos", function (data) {
        $("#tblProveedores").DataTable({
            data: data,
            destroy: true,
            columns: [
                { data: "id_proveedor" },
                { data: "nombre_comercial" },
                { data: "nit" },
                { data: "telefono" },
                { data: "email" },
                { data: "id_tipo_proveedor" },
                {
                    data: "id_proveedor",
                    render: function (data) {
                        return `<button class="btn btn-sm btn-danger" onclick="EliminarProveedorPorId(${data})">
                            <i class="fas fa-trash-alt"></i>
                        </button>`;
                    },
                    orderable: false
                }
            ]
        });
    });
}

async function EjecutarComandoProveedor(metodo, accion) {
    const proveedor = {
        id_proveedor: parseInt($("#txtid_proveedor").val()),
        nombre_comercial: $("#txtnombre_comercial").val(),
        nit: $("#txtnit").val(),
        telefono: $("#txttelefono").val(),
        email: $("#txtemail").val(),
        id_tipo_proveedor: parseInt($("#txtid_tipo_proveedor").val())
    };

    try {
        const res = await fetch(BaseURL + accion, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(proveedor)
        });

        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaProveedores();
    } catch (error) {
        alert("Error al realizar la operación: " + error);
    }
}

async function ConsultarProveedor() {
    const id = $("#txtid_proveedor").val();
    if (!id) {
        alert("Ingrese el ID para consultar.");
        return;
    }

    try {
        const res = await fetch(BaseURL + "ConsultarPorId?id=" + id);
        if (res.ok) {
            const p = await res.json();
            $("#txtnombre_comercial").val(p.nombre_comercial);
            $("#txtnit").val(p.nit);
            $("#txttelefono").val(p.telefono);
            $("#txtemail").val(p.email);
            $("#txtid_tipo_proveedor").val(p.id_tipo_proveedor);
        } else {
            alert("Proveedor no encontrado.");
        }
    } catch (error) {
        alert("Error al consultar: " + error);
    }
}

async function EliminarProveedorDesdeFormulario() {
    const id = $("#txtid_proveedor").val();
    if (!id) {
        alert("Ingrese el ID para eliminar.");
        return;
    }

    if (!confirm("¿Estás seguro de eliminar este proveedor?")) return;

    try {
        const res = await fetch(BaseURL + "EliminarPorId?id=" + id, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaProveedores();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

async function EliminarProveedorPorId(id) {
    if (!confirm("¿Estás seguro de eliminar este proveedor?")) return;

    try {
        const res = await fetch(BaseURL + "EliminarPorId?id=" + id, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaProveedores();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}
