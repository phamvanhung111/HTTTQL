import React, { useState, useEffect }from 'react'
import { ListGroup } from 'react-bootstrap';
import NewProduct from './NewProduct';
import UpdateProduct from './UpdateProduct';
import ViewChart from './ViewChart';
import ExportReport from './ExportReport';
import NavigationBar from './NavigationBar/NavigationBar';

function Admin() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const handleClickOne = () => {
        setSelectedComponent(<NewProduct />);
    }

    const handleClickTwo = () => {
        setSelectedComponent(<UpdateProduct />);
    }

    const handleClickThree = () => {
        setSelectedComponent(<ViewChart/>);
    }

    const handleClickFour = () => {
        setSelectedComponent(<ExportReport />);
    }

    return (
        <div>
            <div>
                <NavigationBar />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <p></p>
                        <ListGroup>
                            <ListGroup.Item onClick={handleClickOne}>Thêm mới sản phẩm</ListGroup.Item>
                            <ListGroup.Item onClick={handleClickTwo}>Cập nhật sản phẩm</ListGroup.Item>
                            <ListGroup.Item onClick={handleClickThree}>Xem báo cáo</ListGroup.Item>
                            <ListGroup.Item onClick={handleClickFour}>Xuất báo cáo</ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className="col-md-9">
                        {selectedComponent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
