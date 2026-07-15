export type HyprlandIPCEventsMap = {
  workspace: [name: string]
  workspacev2: [id: string, name: string]
  focusedmon: [monitor: string, workspace: string]
  focusedmonv2: [monitor: string, workspaceId: string]
  activewindow: [className: string, title: string]
  activewindowv2: [address: string]
  fullscreen: [fullscreen: '0' | '1']
  monitorremoved: [name: string]
  monitorremovedv2: [id: string, name: string, description: string]
  monitoradded: [name: string]
  monitoraddedv2: [id: string, name: string, description: string]
  createworkspace: [name: string]
  createworkspacev2: [id: string, name: string]
  destroyworkspace: [name: string]
  destroyworkspacev2: [id: string, name: string]
  moveworkspace: [workspace: string, monitor: string]
  moveworkspacev2: [id: string, workspace: string, monitor: string]
  renameworkspace: [id: string, newName: string]
  activespecial: [workspace: string, monitor: string]
  activespecialv2: [id: string, workspace: string, monitor: string]
  activelayout: [keyboard: string, layout: string]
  openwindow: [
    address: string,
    workspace: string,
    className: string,
    title: string,
  ]
  closewindow: [address: string]
  kill: [address: string]
  movewindow: [address: string, workspace: string]
  movewindowv2: [address: string, workspaceId: string, workspace: string]
  openlayer: [namespace: string]
  closelayer: [namespace: string]
  submap: [name: string]
  changefloatingmode: [address: string, floating: '0' | '1']
  urgent: [address: string]
  screencast: [active: '0' | '1', owner: 'monitor' | 'window' | 'region']
  screencastv2: [
    active: '0' | '1',
    owner: 'monitor' | 'window' | 'region',
    name: string,
  ]
  windowtitle: [address: string]
  windowtitlev2: [address: string, title: string]
  togglegroup: [active: '0' | '1', ...addresses: string[]]
  moveintogroup: [address: string]
  moveoutofgroup: [address: string]
  ignoregrouplock: [enabled: '0' | '1']
  lockgroups: [enabled: '0' | '1']
  configreloaded: []
  pin: [address: string, pinned: '0' | '1']
  minimized: [address: string, minimized: '0' | '1']
  bell: [address: string]
}
