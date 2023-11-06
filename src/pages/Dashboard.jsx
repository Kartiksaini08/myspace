import FileUpload from "../components/FileUpload";

function Dashboard() {
    return (
        <div className="text-white flex justify-center items-center text-3xl h-full">
            <p> <FileUpload></FileUpload></p>
        </div>
    );
}

export default Dashboard;