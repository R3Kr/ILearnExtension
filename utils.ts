export const unbind_event_listeners = function (node: HTMLElement) {
    var parent = node.parentNode;
    if (parent) {
      parent.replaceChild(node.cloneNode(true), node);
    } else {
      var ex = new Error(
        "Cannot remove event listeners from detached or document nodes"
      ) as any;
      ex.code = DOMException[(ex.name = "HIERARCHY_REQUEST_ERR")];
      throw ex;
    }
  };