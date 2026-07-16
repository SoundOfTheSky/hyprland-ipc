import { HyprlandMonitor } from './monitor'
import { HyprlandWorkspace } from './workspace'

export type Gradient = string | { colors?: string[]; angle?: number }
export type Vec2 = [number | string, number | string]
export type CSSGaps =
  number | { top?: number; left?: number; right?: number; bottom?: number }
export type FontWeight =
  | number
  | 'thin'
  | 'ultralight'
  | 'light'
  | 'semilight'
  | 'book'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'ultrabold'
  | 'heavy'
  | 'ultraheavy'
export type FullscreenState = 0 | 1 | 2
export type WorkspaceLayout =
  'dwindle' | 'scrolling' | 'floating' | 'master' | 'monocle'
export type WorkspaceRule = {
  workspace: HyprlandWorkspace | string | number
  monitor?: HyprlandMonitor | string
  default?: boolean
  gaps_in?: CSSGaps
  gaps_out?: CSSGaps
  float_gaps?: CSSGaps
  border_size?: number
  no_border?: boolean
  no_shadow?: boolean
  no_rounding?: boolean
  decorate?: boolean
  persistent?: boolean
  on_created_empty?: string
  default_name?: string
  layout?: WorkspaceLayout
  animation?: string
  layout_opts?: any
}
export type LayerRule = {
  match: {
    namespace: RegExp | string
  }
  no_anim?: boolean
  blur?: boolean
  blur_popups?: boolean
  ignore_alpha?: number
  dim_around?: boolean
  xray?: boolean
  animation?: string
  order?: number
  above_lock?: number
  no_screen_share?: boolean
}

export type WindowRule = {
  match: {
    class?: RegExp | string
    title?: RegExp | string
    initial_class?: RegExp | string
    initial_title?: RegExp | string
    tag?: string
    xwayland?: boolean
    float?: boolean
    fullscreen?: boolean
    pin?: boolean
    focus?: boolean
    group?: boolean
    modal?: boolean
    fullscreen_state_client?: FullscreenState
    fullscreen_state_internal?: FullscreenState
    workspace?: number | HyprlandWorkspace
    content?: string
    xdg_tag?: RegExp | string
  }
  float?: boolean
  tile?: boolean
  fullscreen?: boolean
  maximize?: boolean
  fullscreen_state?: string
  move?: Vec2
  size?: Vec2
  center?: boolean
  pseudo?: boolean
  monitor?: string | HyprlandMonitor
  workspace?: string | HyprlandWorkspace
  no_initial_focus?: boolean
  pin?: boolean
  group?: string
  suppress_event?:
    | 'fullscreen'
    | 'maximize'
    | 'activate'
    | 'activatefocus'
    | 'fullscreenoutput'
    | 'x11configurerequest'
  content?: 'none' | 'photo' | 'video' | 'game'
  no_close_for?: number
  scrolling_width?: number

  // dynamic
  persistent_size?: boolean
  no_max_size?: boolean
  stay_focused?: boolean
  animation?: string
  border_color?: Gradient
  idle_inhibit?: 'none' | 'always' | 'focus' | 'fullscreen'
  opacity?: string
  tag?: string
  max_size?: [number, number]
  min_size?: [number, number]
  border_size?: number
  rounding?: number
  rounding_power?: number
  allows_input?: boolean
  dim_around?: boolean
  decorate?: boolean
  focus_on_activate?: boolean
  keep_aspect_ratio?: boolean
  nearest_neighbor?: boolean
  no_anim?: boolean
  no_blur?: boolean
  no_dim?: boolean
  no_focus?: boolean
  no_follow_mouse?: boolean
  no_shadow?: boolean
  no_shortcuts_inhibit?: boolean
  no_screen_share?: boolean
  no_vrr?: boolean
  no_auto_hdr?: boolean
  opaque?: boolean
  force_rgbx?: boolean
  sync_fullscreen?: boolean
  immediate?: boolean
  xray?: boolean
  render_unfocused?: boolean
  scroll_mouse?: number
  scroll_touchpad?: number
  confine_pointer?: boolean
  tonemap?: string
}

export type HyprlandConfig = {
  general?: {
    border_size?: number
    gaps_in?: CSSGaps
    gaps_out?: CSSGaps
    float_gaps?: CSSGaps
    gaps_workspaces?: number
    'col.inactive_border'?: Gradient
    'col.active_border'?: Gradient
    'col.nogroup_border'?: Gradient
    'col.nogroup_border_active'?: Gradient
    layout?: WorkspaceLayout
    no_focus_fallback?: boolean
    resize_on_border?: boolean
    extend_border_grab_area?: number
    hover_icon_on_border?: boolean
    allow_tearing?: boolean
    resize_corner?: number
    modal_parent_blocking?: boolean
    locale?: string
    snap?: {
      enabled?: boolean
      window_gap?: number
      monitor_gap?: number
      border_overlap?: boolean
      respect_gaps?: boolean
    }
  }

  decoration?: {
    rounding?: number
    rounding_power?: number
    active_opacity?: number
    inactive_opacity?: number
    fullscreen_opacity?: number
    dim_modal?: boolean
    dim_inactive?: boolean
    dim_strength?: number
    dim_special?: number
    dim_around?: number
    screen_shader?: string
    border_part_of_window?: boolean
    blur?: {
      enabled?: boolean
      size?: number
      passes?: number
      ignore_opacity?: boolean
      new_optimizations?: boolean
      xray?: boolean
      noise?: number
      contrast?: number
      brightness?: number
      vibrancy?: number
      vibrancy_darkness?: number
      special?: boolean
      popups?: boolean
      popups_ignorealpha?: number
      input_methods?: boolean
      input_methods_ignorealpha?: number
    }
    shadow?: {
      enabled?: boolean
      range?: number
      render_power?: 1 | 2 | 3 | 4
      sharp?: boolean
      color?: Gradient
      color_inactive?: Gradient
      offset?: Vec2
      scale?: number
    }
    glow?: {
      enabled?: boolean
      range?: number
      render_power?: 1 | 2 | 3 | 4
      color?: Gradient
      color_inactive?: Gradient
    }
    motion_blur?: {
      enabled?: boolean
      samples?: number
    }
  }

  animations?: {
    enabled?: boolean
    workspace_wraparound?: boolean
  }

  input?: {
    kb_model?: string
    kb_layout?: string
    kb_variant?: string
    kb_options?: string
    kb_rules?: string
    kb_file?: string
    numlock_by_default?: boolean
    resolve_binds_by_sym?: boolean
    repeat_rate?: number
    repeat_delay?: number
    sensitivity?: number
    accel_profile?: 'adaptive' | 'flat' | 'custom' | ''
    force_no_accel?: boolean
    rotation?: number
    left_handed?: boolean
    scroll_points?: string
    scroll_method?: '2fg' | 'edge' | 'on_button_down' | 'no_scroll' | ''
    scroll_button?: number
    scroll_button_lock?: boolean
    scroll_factor?: number
    natural_scroll?: boolean
    follow_mouse?: 0 | 1 | 2 | 3
    follow_mouse_shrink?: number
    follow_mouse_threshold?: number
    focus_on_close?: 0 | 1 | 2
    mouse_refocus?: boolean
    float_switch_override_focus?: 0 | 1 | 2
    special_fallthrough?: boolean
    off_window_axis_events?: 0 | 1 | 2 | 3
    emulate_discrete_scroll?: 0 | 1 | 2

    touchpad?: {
      disable_while_typing?: boolean
      natural_scroll?: boolean
      scroll_factor?: number
      middle_button_emulation?: boolean
      tap_button_map?: 'lrm' | 'lmr' | ''
      clickfinger_behavior?: boolean
      tap_to_click?: boolean
      drag_lock?: 0 | 1 | 2
      tap_and_drag?: boolean
      flip_x?: boolean
      flip_y?: boolean
      drag_3fg?: 0 | 1 | 2
    }

    touchdevice?: {
      transform?: number
      output?: string
      enabled?: boolean
    }

    virtualkeyboard?: {
      share_states?: 0 | 1 | 2
      release_pressed_on_close?: boolean
    }

    tablet?: {
      transform?: number
      output?: string
      region_position?: Vec2
      absolute_region_position?: boolean
      region_size?: Vec2
      relative_input?: boolean
      left_handed?: boolean
      active_area_size?: Vec2
      active_area_position?: Vec2
    }

    tablettool?: {
      eraser_button_mode?: 0 | 1
      eraser_button_override?: number
      pressure_range_min?: number
      pressure_range_max?: number
    }
  }

  gestures?: {
    workspace_swipe_distance?: number
    workspace_swipe_touch?: boolean
    workspace_swipe_invert?: boolean
    workspace_swipe_touch_invert?: boolean
    workspace_swipe_min_speed_to_force?: number
    workspace_swipe_cancel_ratio?: number
    workspace_swipe_create_new?: boolean
    workspace_swipe_direction_lock?: boolean
    workspace_swipe_direction_lock_threshold?: number
    workspace_swipe_forever?: boolean
    workspace_swipe_use_r?: boolean
    close_max_timeout?: number

    scrolling?: {
      move_snap_to_grid?: boolean
      move_snap_cursor?: boolean
    }
  }

  group?: {
    auto_group?: boolean
    insert_after_current?: boolean
    focus_removed_window?: boolean
    drag_into_group?: 0 | 1 | 2
    merge_groups_on_drag?: boolean
    merge_groups_on_groupbar?: boolean
    merge_floated_into_tiled_on_groupbar?: boolean
    group_on_movetoworkspace?: boolean
    'col.border_active'?: Gradient
    'col.border_inactive'?: Gradient
    'col.border_locked_active'?: Gradient
    'col.border_locked_inactive'?: Gradient

    groupbar?: {
      enabled?: boolean
      font_family?: string
      font_size?: number
      font_weight_active?: FontWeight
      font_weight_inactive?: FontWeight
      gradients?: boolean
      height?: number
      indicator_gap?: number
      indicator_height?: number
      stacked?: boolean
      priority?: number
      render_titles?: boolean
      text_offset?: number
      text_padding?: number
      scrolling?: boolean
      rounding?: number
      rounding_power?: number
      gradient_rounding?: number
      gradient_rounding_power?: number
      round_only_edges?: boolean
      gradient_round_only_edges?: boolean
      text_color?: string
      text_color_inactive?: string
      text_color_locked_active?: string
      text_color_locked_inactive?: string
      'col.active'?: Gradient
      'col.inactive'?: Gradient
      'col.locked_active'?: Gradient
      'col.locked_inactive'?: Gradient
      gaps_in?: number
      gaps_out?: number
      keep_upper_gap?: boolean
      middle_click_close?: boolean
      blur?: boolean
    }
  }

  misc?: {
    disable_hyprland_logo?: boolean
    disable_splash_rendering?: boolean
    disable_scale_notification?: boolean
    'col.splash'?: string
    font_family?: string
    splash_font_family?: string
    force_default_wallpaper?: -1 | 0 | 1 | 2
    vrr?: 0 | 1 | 2 | 3
    mouse_move_enables_dpms?: boolean
    key_press_enables_dpms?: boolean
    name_vk_after_proc?: boolean
    always_follow_on_dnd?: boolean
    layers_hog_keyboard_focus?: boolean
    animate_manual_resizes?: boolean
    animate_mouse_windowdragging?: boolean
    disable_autoreload?: boolean
    enable_swallow?: boolean
    swallow_regex?: string
    swallow_exception_regex?: string
    focus_on_activate?: boolean
    mouse_move_focuses_monitor?: boolean
    allow_session_lock_restore?: boolean
    session_lock_xray?: boolean
    background_color?: string
    close_special_on_empty?: boolean
    on_focus_under_fullscreen?: 0 | 1 | 2
    exit_window_retains_fullscreen?: boolean
    initial_workspace_tracking?: 0 | 1 | 2
    middle_click_paste?: boolean
    render_unfocused_fps?: number
    disable_xdg_env_checks?: boolean
    disable_hyprland_guiutils_check?: boolean
    lockdead_screen_delay?: number
    enable_anr_dialog?: boolean
    anr_missed_pings?: number
    size_limits_tiled?: boolean
    screencopy_force_8b?: boolean
    disable_watchdog_warning?: boolean
  }

  layout?: {
    single_window_aspect_ratio?: Vec2
    single_window_aspect_ratio_tolerance?: number
  }

  binds?: {
    pass_mouse_when_bound?: boolean
    scroll_event_delay?: number
    workspace_back_and_forth?: boolean
    hide_special_on_workspace_change?: boolean
    allow_workspace_cycles?: boolean
    workspace_center_on?: 0 | 1
    focus_preferred_method?: 0 | 1
    ignore_group_lock?: boolean
    movefocus_cycles_fullscreen?: boolean
    movefocus_cycles_groupfirst?: boolean
    window_direction_monitor_fallback?: boolean
    disable_keybind_grabbing?: boolean
    allow_pin_fullscreen?: boolean
    drag_threshold?: number
  }

  xwayland?: {
    enabled?: boolean
    use_nearest_neighbor?: boolean
    force_zero_scaling?: boolean
    create_abstract_socket?: boolean
  }

  opengl?: {
    nvidia_anti_flicker?: boolean
  }

  render?: {
    direct_scanout?: 0 | 1 | 2
    expand_undersized_textures?: boolean
    xp_mode?: boolean
    ctm_animation?: 0 | 1 | 2
    cm_enabled?: boolean
    send_content_type?: boolean
    cm_auto_hdr?: 0 | 1 | 2
    new_render_scheduling?: boolean
    non_shader_cm?: 0 | 1 | 2 | 3
    non_shader_cm_interop?: 0 | 1 | 2
    cm_sdr_eotf?: 'default' | 'gamma22' | 'gamma22force' | 'srgb'
    commit_timing_enabled?: boolean
    use_fp16?: 0 | 1 | 2
    keep_unmodified_copy?: 0 | 1 | 2
    use_shader_blur_blend?: boolean
    icc_vcgt_enabled?: boolean
    fp16_sdr_tf?: 0 | 1
  }

  cursor?: {
    invisible?: boolean
    sync_gsettings_theme?: boolean
    no_hardware_cursors?: 0 | 1 | 2
    no_break_fs_vrr?: 0 | 1 | 2
    min_refresh_rate?: number
    hotspot_padding?: number
    inactive_timeout?: number
    no_warps?: boolean
    persistent_warps?: boolean
    warp_on_change_workspace?: 0 | 1 | 2
    warp_on_toggle_special?: 0 | 1 | 2
    default_monitor?: string
    zoom_factor?: number
    zoom_rigid?: boolean
    zoom_detached_camera?: boolean
    enable_hyprcursor?: boolean
    hide_on_key_press?: boolean
    hide_on_touch?: boolean
    hide_on_tablet?: boolean
    use_cpu_buffer?: 0 | 1 | 2
    warp_back_after_non_mouse_input?: boolean
    zoom_disable_aa?: boolean
  }

  ecosystem?: {
    no_update_news?: boolean
    no_donation_nag?: boolean
    enforce_permissions?: boolean
  }

  quirks?: {
    prefer_hdr?: 0 | 1 | 2
    skip_non_kms_dmabuf_formats?: boolean
  }

  debug?: {
    overlay?: boolean
    damage_blink?: boolean
    gl_debugging?: boolean
    vfr?: boolean
    disable_logs?: boolean
    disable_time?: boolean
    damage_tracking?: 0 | 1 | 2
    enable_stdout_logs?: boolean
    manual_crash?: 0 | 1
    suppress_errors?: boolean
    log_damage?: boolean
    disable_scale_checks?: boolean
    error_limit?: number
    error_position?: 0 | 1
    colored_stdout_logs?: boolean
    pass?: boolean
    full_cm_proto?: boolean
    ds_handle_same_buffer?: boolean
    ds_handle_same_buffer_fifo?: boolean
    fifo_pending_workaround?: boolean
    render_solitary_wo_damage?: boolean
    invalidate_fp16?: 0 | 1 | 2
  }

  experimental?: {
    wp_cm_1_2?: boolean
  }
}

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

export type HyprlandMonitorData = {
  id: number
  name: string
  description: string
  make: string
  model: string
  serial: string
  width: number
  height: number
  physicalWidth: number
  physicalHeight: number
  refreshRate: number
  x: number
  y: number
  activeWorkspace: {
    id: number
    name: WorkspaceLayout
  }
  specialWorkspace: {
    id: number
    name: string
  }
  reserved: [number, number, number, number]
  scale: number
  transform: number
  focused: boolean
  dpmsStatus: boolean
  vrr: boolean
  solitary: string[]
  solitaryBlockedBy: string[]
  activelyTearing: boolean
  tearingBlockedBy: string[]
  directScanoutTo: string
  directScanoutBlockedBy: string[]
  disabled: boolean
  currentFormat: string
  mirrorOf: string
  availableModes: string[]
  colorManagementPreset: string
  sdrBrightness: number
  sdrSaturation: number
  sdrMinLuminance: number
  sdrMaxLuminance: number
  hardwareCursorsInUse: number
}

export type Direction = 'left' | 'right' | 'up' | 'down'
export type HyprlandWindowData = {
  address: string
  mapped: boolean
  hidden: boolean
  visible: boolean
  acceptsInput: boolean
  at: [number, number]
  size: [number, number]
  workspace: {
    id: number
    name: string
  }
  floating: boolean
  monitor: number
  class: string
  title: string
  initialClass: string
  initialTitle: string
  pid: number
  xwayland: boolean
  pinned: boolean
  fullscreen: number
  fullscreenClient: number
  overFullscreen: boolean
  grouped: []
  tags: []
  swallowing: string
  focusHistoryID: number
  inhibitingIdle: boolean
  xdgTag: string
  xdgDescription: string
  contentType: string
  stableId: string
}

export type HyprlandWorkspaceData = {
  id: number
  name: string
  monitor: string
  monitorID: number
  windows: number
  hasfullscreen: boolean
  lastwindow: string
  lastwindowtitle: string
  ispersistent: boolean
  tiledLayout: WorkspaceLayout
}
