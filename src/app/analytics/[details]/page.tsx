

const Details = ({params}) => {
    // console.log(params.details);
    return (
        <div>
            <h2>This is details Page</h2>
            <h3>{params.details}</h3>
        </div>
    );
};

export default Details;