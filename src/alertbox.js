import Swal from "sweetalert2";

const alert = (props) => {
    Swal.fire({
        title: props.title,
        text: props.text,
        width: '25em',
        background: '#1e1e1e',
        color: '#fff'
    });
}

export default alert;