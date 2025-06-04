const BaseURL = "http://inmobiliaria.runasp.net/api/TipoProveedor/";

$(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaTiposProveedor();
});

function LlenarTablaTiposProveedor() {
    $.get(BaseURL + "ConsultarTodos", function (data) {
        $("#tblTiposProveedor").DataTable({
            data: data,
            destroy: true,
            columns: [
                { data: "id_tipo_proveedor" },
                { data: "descripcion" },
                {
                    data: "id_tipo_proveedor",
                    render: function (data) {
                        return `<button class="btn btn-sm btn-danger" onclick="EliminarTipoProveedorPorId(${data})">
                            <i class="fas fa-trash-alt"></i>
                        </button>`;
                    },
                    orderable: false
                }
            ]
        });
    });
}

async function EjecutarComandoTipoProveedor(metodo, accion) {
    const tipoProveedor = {
        id_tipo_proveedor: parseInt($("#txtid_tipo_proveedor").val()),
        descripcion: $("#txtdescripcion").val()
    };

    try {
        const res = await fetch(BaseURL + accion, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tipoProveedor)
        });

        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaTiposProveedor();
    } catch (error) {
        alert("Error al realizar la operación: " + error);
    }
}

async function ConsultarTipoProveedor() {
    const id = $("#txtid_tipo_proveedor").val();
    if (!id) {
        alert("Ingrese el ID para consultar.");
        return;
    }

    try {
        const res = await fetch(BaseURL + "ConsultarPorId?id=" + id);
        if (res.ok) {
            const tipo = await res.json();
            $("#txtdescripcion").val(tipo.descripcion);
        } else {
            alert("Tipo de proveedor no encontrado.");
        }
    } catch (error) {
        alert("Error al consultar: " + error);
    }
}

async function EliminarTipoProveedorDesdeFormulario() {
    const id = $("#txtid_tipo_proveedor").val();
    if (!id) {
        alert("Ingrese el ID para eliminar.");
        return;
    }

    if (!confirm("¿Estás seguro de eliminar este tipo de proveedor?")) return;

    try {
        const res = await fetch(BaseURL + "EliminarPorId?id=" + id, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaTiposProveedor();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}

async function EliminarTipoProveedorPorId(id) {
    if (!confirm("¿Estás seguro de eliminar este tipo de proveedor?")) return;

    try {
        const res = await fetch(BaseURL + "EliminarPorId?id=" + id, { method: "DELETE" });
        const mensaje = await res.text();
        alert(mensaje);
        LlenarTablaTiposProveedor();
    } catch (error) {
        alert("Error al eliminar: " + error);
    }
}
