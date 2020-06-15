import React, { Component } from 'react';
import promiseRequest from 'request-promise';

export default class Login extends Component {

    state = {
        printerList: [],
        isPrinterSelected: ''
    }

    accessToken = '';
    refreshToken = '';
    componentDidMount() {
        const code = new URLSearchParams(this.props.location.search).get("code");
        console.log('code:::::::', code);


        const data = {
            code,
            redirect_uri: 'http://localhost:3001/home',
            client_id: '830134837934-ee9q3fh05ht8pog6m0fe4c8n0i6nvjk4.apps.googleusercontent.com',
            client_secret: 'DJvlfKtb1FyJohbkHfVXkfPH',
            grant_type: 'authorization_code'
        }


        let url = 'https://www.googleapis.com/oauth2/v3/token'
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then((data) => {
            const json = data.json();
            console.log('json', json);;
            json.then((dat) => {
                console.log('data:::::::::', dat.access_token);
                this.accessToken = dat.access_token;
                this.refreshToken = dat.refresh_token;
                // this.setState({ accessToken: dat.access_token, refreshToken: dat.refresh_token })



                url = `http://localhost:3000/printer?accessToken=${this.accessToken}&refreshToken=${this.refreshToken}`;

                console.log('here', this.state);
                fetch(url, {
                    method: 'GET', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                }).then((data) => {
                    const json = data.json();
                    console.log('json', json);;
                    json.then((dat) => {
                        console.log('data:::::::::', dat);
                        this.setState({ printerList: dat })
                    })

                }).then(json => {
                    console.log('res:::::::::::', json);
                })
            })

        })

        // const accessToken = 'ya29.a0AfH6SMCdtTUIDIWbaoUXyimFWeJpIjDn13zceu9ZYMf0USKW-gVvn89P17VsPx45MTW9A53iVPOBw5sHkNnOvp9CUhUyYd5hqgLQBVLgv8RrpcvdTRxQVhkFbAcXNbTltVYBDkVi3oq5s_iTacwnrjRcVTFjIyhfNbY';
        // const refreshToken = '1//0g4rCokfqPOmWCgYIARAAGBASNwF-L9Ir0BURILwS_I4rssvWgXaq-teFm4PzJTzBXCLk1p_nurKSTmGJ6zkmv-h5ov47uLN2hhE'




        // })


    };


    handleChangePrinterOptions = (event) => {
        console.log(event.target);
        const { value, name } = event.target;
        console.log('v:::::', value);
        console.log('n::::::::', name);
        this.setState({ isPrinterSelected: value })
    };

    Print = () => {
        console.log('print');

        const data = {
            printerId: this.state.isPrinterSelected
        };

        console.log('data...', this.state.isPrinterSelected);

        let url = `http://localhost:3000/printer?accessToken=${this.accessToken}&refreshToken=${this.refreshToken}`;

        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then((data) => {
            const json = data.json();
            console.log('json', json);;
            json.then((dat) => {
                console.log('data:::::::::', dat);
            })
            alert('done');
        })
    };

    render() {
        const { printerList, isPrinterSelected } = this.state;
        return (
            <div>
                <select name="cars" id="cars" onChange={event => this.handleChangePrinterOptions(event)}>

                    {printerList.length ? printerList.map(item =>
                        <option value={item.id}>{item.name}</option>
                    ) : null}

                </select>

                {isPrinterSelected !== '' ? <button onClick={() => this.Print()} >Print</button> : null}
            </div>
        )
    }
}