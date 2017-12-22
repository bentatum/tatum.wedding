export default actionType => {
  if (!actionType) {
    return null
  }
  return `${actionType}/success`
}
