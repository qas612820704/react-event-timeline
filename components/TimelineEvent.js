import React, {Component} from 'react'
import s from './styles'

class TimelineEvent extends Component {

  mergeNotificationStyle(iconColor) {
    return iconColor ? {...s.eventCircle, ...{color: iconColor, borderColor: iconColor}} : s.eventCircle
  }

  mergeContentStyle(contentStyle) {
    const messageStyle = this.showAsCard() ? s.cardBody : s.message
    return contentStyle ? {...messageStyle, ...contentStyle} : messageStyle
  }

  timeStyle() {
    return this.showAsCard() ? {...s.time, color: '#fff'} : s.time
  }

  showAsCard() {
    const {container} = this.props
    return container === 'card'
  }

  containerStyle() {
    const {style} = this.props
    const userStyle = style || {}
    return this.showAsCard() ? {...s.eventContainer, ...s.card, ...userStyle} : s.eventContainer
  }

  render() {
    const {createdAt, title, contentStyle, buttons, icon, iconColor, container, ...otherProps} = this.props
    return <div style={s.event}>
      <div style={this.mergeNotificationStyle(iconColor)}>
        <span style={s.icon}>{icon}</span>
      </div>
      <div {...otherProps} style={this.containerStyle()}>

        <div style={s.eventContainerBefore} />

        <div style={container === 'card' ? s.cardTitle : {}}>
          <div style={this.timeStyle()}>{createdAt}</div>
          <div>{title}</div>
          <div style={s.actionButtons}>{buttons}</div>
        </div>
        <div style={this.mergeContentStyle(contentStyle)}>
          {this.props.children}
          <div style={s.messageAfter} />
        </div>
      </div>
      <div style={s.eventAfter} />
    </div>
  }

}

TimelineEvent.propTypes = {
  children: React.PropTypes.node.isRequired,
  title: React.PropTypes.node.isRequired,
  createdAt: React.PropTypes.node.isRequired,
  buttons: React.PropTypes.node,
  container: React.PropTypes.string,
  icon: React.PropTypes.node,
  iconColor: React.PropTypes.string,
  contentStyle: React.PropTypes.object,
  style: React.PropTypes.object
}

export default TimelineEvent
