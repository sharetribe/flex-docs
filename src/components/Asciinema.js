import React, { Component } from "react"

// Custom component to render the embedded Asciinema player.
//
// Usage:
//
// <asciinema id="267480"></asciinema>
//

class Asciinema extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const script = document.createElement('script');

    script.setAttribute('id', "asciicast-" + this.props.id)
    script.setAttribute('src', 'https://asciinema.org/a/' + this.props.id + '.js');
    script.setAttribute('async', 'true');

    script.dataset.autoplay = this.props.autoPlay || "true";
    script.dataset.speed = this.props.speed || "1.5";
    script.dataset.loop = this.props.loop || "1";

    this.ref.current.append(script);
  }

  render() {
    return (<span ref={this.ref} />)
  }
}

export default Asciinema;
