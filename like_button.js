'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
    }

    render() {
        if (this.state.liked) {
            return 'Вы запустили игру!';
        }

        return e(
            'button', {
                onClick: () => this.setState({
                    liked: true
                })
            },
            'Создать игру'
        );
    }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);