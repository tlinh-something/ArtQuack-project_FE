import axios from "axios";
import React from "react";

class ListUser extends React.Component {
    state = {
        listUser: []
    }
    async componentDidMount(){
        let res = axios.get('')
        this.state({
            listUser: res && res.data ? res.data : []
        })
    }

    render() {
        let listUser = this.state;
        return (
            <div>
                <div className="title-user">ListUser by Axios</div>
                <div>
                    <div>
                        {listUser && listUser.length > 0 && listUser.map((item, index) => {
                            return (
                                <div key={item.id}>
                                    {index + 1} - {item.name}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default ListUser;