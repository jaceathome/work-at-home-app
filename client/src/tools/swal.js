function alertError(title = "Something went wrong", message = "") {
    console.error({title, message});
    return Swal.fire(
        title,
        message,
        'error'
    )
}

function alertSuccess(title = "", message = "") {
    return Swal.fire(
        title,
        message,
        'success'
    )
}

function alertSuccessWithAuto(title="Data has been saved") {
    return Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 1500
    })
}

function alertWarning(title="", message="") {
    console.warn({title, message});
    return Swal.fire(
        title,
        message,
        'warning'
    )
}

function alertConfirmWarning(title="Confirm it first!",message="Are you sure?",cb=null){
    return Swal.fire({
        icon: "warning",
        text: message,
        title,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            if(cb) cb();
            console.log("confirmed")
        }else {
            console.log("canceled")
        }
    })
}

export {
    alertError,
    alertSuccess,
    alertSuccessWithAuto,
    alertWarning,
    alertConfirmWarning
};