import { HyprlandMonitor } from './monitor'
import { HyprlandWorkspace } from './workspace'

/** A color gradient used by Hyprland decorations such as borders and shadows. */
export type Gradient = string | { colors?: string[]; angle?: number }

/** A 2D vector used for positions or sizes in Hyprland config values. */
export type Vec2 = [number | string, number | string]

/** Gap values used for window spacing and workspace spacing in Hyprland. */
export type CSSGaps =
  number | { top?: number; left?: number; right?: number; bottom?: number }

/** A font weight that Hyprland can understand for UI text rendering. */
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

/** The fullscreen state of a window in Hyprland. */
export type FullscreenState = 0 | 1 | 2

/** A layout mode used by Hyprland workspaces. */
export type WorkspaceLayout =
  'dwindle' | 'scrolling' | 'floating' | 'master' | 'monocle'

export type Direction = 'left' | 'right' | 'up' | 'down'

/** A rule that applies to a workspace in Hyprland. */
export type WorkspaceRule = {
  /** The workspace name, ID, or special workspace target for the rule. */
  workspace: HyprlandWorkspace | string | number
  /** The monitor where the workspace should be created or assigned. */
  monitor?: HyprlandMonitor | string
  /** Whether this should be the default rule for matching workspaces. */
  default?: boolean
  /** The inner gaps applied to the workspace. */
  gaps_in?: CSSGaps
  /** The outer gaps applied to the workspace. */
  gaps_out?: CSSGaps
  /** The gaps used for floating windows in the workspace. */
  float_gaps?: CSSGaps
  /** The border size for windows in this workspace. */
  border_size?: number
  /** Disables borders for windows matching this rule. */
  no_border?: boolean
  /** Disables shadows for windows matching this rule. */
  no_shadow?: boolean
  /** Disables rounded corners for windows matching this rule. */
  no_rounding?: boolean
  /** Controls whether windows should be decorated. */
  decorate?: boolean
  /** Makes the workspace persist across sessions. */
  persistent?: boolean
  /** The command executed when the workspace opens with no windows. */
  on_created_empty?: string
  /** The default name assigned to the workspace. */
  default_name?: string
  /** The layout used by this workspace. */
  layout?: WorkspaceLayout
  /** The animation profile applied to the workspace. */
  animation?: string
  /** Extra layout options passed to Hyprland. */
  layout_opts?: any
}

/** A rule that changes the appearance or behavior of a layer surface. */
export type LayerRule = {
  /** The layer namespace match used to target a layer surface. */
  match: {
    /** The namespace that identifies the layer surface. */
    namespace: RegExp | string
  }
  /** Disables animations for this layer. */
  no_anim?: boolean
  /** Enables blur for the layer. */
  blur?: boolean
  /** Enables blur for popup surfaces. */
  blur_popups?: boolean
  /** The alpha threshold used for blur effects. */
  ignore_alpha?: number
  /** Makes the layer dim the surrounding area. */
  dim_around?: boolean
  /** Enables xray rendering for the layer. */
  xray?: boolean
  /** The animation profile to use for the layer. */
  animation?: string
  /** The render order of the layer. */
  order?: number
  /** Whether the layer should be rendered above lock screen surfaces. */
  above_lock?: number
  /** Disables screen sharing for this layer. */
  no_screen_share?: boolean
}

/** A rule that modifies the behavior or style of a window in Hyprland. */
export type WindowRule = {
  /** The window match criteria used to select a window. */
  match: {
    /** Matches the window class. */
    class?: RegExp | string
    /** Matches the window title. */
    title?: RegExp | string
    /** Matches the initial window class. */
    initial_class?: RegExp | string
    /** Matches the initial window title. */
    initial_title?: RegExp | string
    /** A tag assigned to the window. */
    tag?: string
    /** Whether the window is XWayland-based. */
    xwayland?: boolean
    /** Makes the window float by default. */
    float?: boolean
    /** Matches windows that are fullscreen. */
    fullscreen?: boolean
    /** Matches pinned windows. */
    pin?: boolean
    /** Matches windows that should receive focus. */
    focus?: boolean
    /** Matches grouped windows. */
    group?: boolean
    /** Matches modal windows. */
    modal?: boolean
    /** Matches windows with a specific fullscreen state. */
    fullscreen_state_client?: FullscreenState
    /** Matches windows with an internal fullscreen state. */
    fullscreen_state_internal?: FullscreenState
    /** The workspace this window should be assigned to. */
    workspace?: number | HyprlandWorkspace
    /** Matches a specific content type. */
    content?: string
    /** Matches the XDG tag of the window. */
    xdg_tag?: RegExp | string
  }
  /** Forces the window to float. */
  float?: boolean
  /** Forces the window to tile. */
  tile?: boolean
  /** Forces the window to fullscreen. */
  fullscreen?: boolean
  /** Forces the window to maximize. */
  maximize?: boolean
  /** The fullscreen state to apply to the window. */
  fullscreen_state?: string
  /** The position to move the window to. */
  move?: Vec2
  /** The size to apply to the window. */
  size?: Vec2
  /** Centers the window on the monitor. */
  center?: boolean
  /** Enables pseudo-tiling for the window. */
  pseudo?: boolean
  /** The monitor that should host the window. */
  monitor?: string | HyprlandMonitor
  /** The workspace that should host the window. */
  workspace?: string | HyprlandWorkspace
  /** Prevents the window from receiving initial focus. */
  no_initial_focus?: boolean
  /** Pins the window. */
  pin?: boolean
  /** Places the window in a named group. */
  group?: string
  /** Controls which events should be suppressed for the window. */
  suppress_event?:
    | 'fullscreen'
    | 'maximize'
    | 'activate'
    | 'activatefocus'
    | 'fullscreenoutput'
    | 'x11configurerequest'
  /** The content type used for the window. */
  content?: 'none' | 'photo' | 'video' | 'game'
  /** Prevents the window from being closed for a given amount of time. */
  no_close_for?: number
  /** The width of a scrolling region for the window. */
  scrolling_width?: number

  /** Keeps the window size persistent. */
  persistent_size?: boolean
  /** Disables maximum size constraints. */
  no_max_size?: boolean
  /** Keeps focus on the window while it is active. */
  stay_focused?: boolean
  /** The animation profile applied to the window. */
  animation?: string
  /** The border color used for the window. */
  border_color?: Gradient
  /** Controls idle inhibition behavior. */
  idle_inhibit?: 'none' | 'always' | 'focus' | 'fullscreen'
  /** The opacity to apply to the window. */
  opacity?: string
  /** A tag assigned to the window. */
  tag?: string
  /** The maximum size of the window. */
  max_size?: [number, number]
  /** The minimum size of the window. */
  min_size?: [number, number]
  /** The border size of the window. */
  border_size?: number
  /** The window rounding radius. */
  rounding?: number
  /** The power of the rounded corner curve. */
  rounding_power?: number
  /** Allows the window to receive input. */
  allows_input?: boolean
  /** Enables dimming around the window. */
  dim_around?: boolean
  /** Controls whether the window should be decorated. */
  decorate?: boolean
  /** Focuses the window when activated. */
  focus_on_activate?: boolean
  /** Preserves the aspect ratio of the window. */
  keep_aspect_ratio?: boolean
  /** Uses nearest-neighbor scaling for the window. */
  nearest_neighbor?: boolean
  /** Disables animations for the window. */
  no_anim?: boolean
  /** Disables blur for the window. */
  no_blur?: boolean
  /** Disables dimming for the window. */
  no_dim?: boolean
  /** Disables focus for the window. */
  no_focus?: boolean
  /** Disables following the mouse for the window. */
  no_follow_mouse?: boolean
  /** Disables shadows for the window. */
  no_shadow?: boolean
  /** Disables shortcuts inhibition for the window. */
  no_shortcuts_inhibit?: boolean
  /** Disables screen sharing for the window. */
  no_screen_share?: boolean
  /** Disables variable refresh rate for the window. */
  no_vrr?: boolean
  /** Disables auto HDR for the window. */
  no_auto_hdr?: boolean
  /** Makes the window opaque. */
  opaque?: boolean
  /** Forces RGBX rendering for the window. */
  force_rgbx?: boolean
  /** Synchronizes fullscreen state with the compositor. */
  sync_fullscreen?: boolean
  /** Applies the rule immediately. */
  immediate?: boolean
  /** Enables xray rendering for the window. */
  xray?: boolean
  /** Renders the window even when unfocused. */
  render_unfocused?: boolean
  /** The mouse scroll factor for the window. */
  scroll_mouse?: number
  /** The touchpad scroll factor for the window. */
  scroll_touchpad?: number
  /** Confines the pointer to the window. */
  confine_pointer?: boolean
  /** The tone mapping mode used by the window. */
  tonemap?: string
}

/** The main Hyprland configuration sections. */
export type HyprlandConfig = {
  /** General window, border, and layout settings. */
  general?: {
    /** The border size for tiled windows. */
    border_size?: number
    /** The inner gaps between windows. */
    gaps_in?: CSSGaps
    /** The outer gaps around the workspace. */
    gaps_out?: CSSGaps
    /** The gaps used by floating windows. */
    float_gaps?: CSSGaps
    /** The gap size used for workspaces. */
    gaps_workspaces?: number
    /** The inactive border color. */
    'col.inactive_border'?: Gradient
    /** The active border color. */
    'col.active_border'?: Gradient
    /** The border color for windows not in a group. */
    'col.nogroup_border'?: Gradient
    /** The active border color for windows not in a group. */
    'col.nogroup_border_active'?: Gradient
    /** The workspace layout mode. */
    layout?: WorkspaceLayout
    /** Falls back to focus if no window has focus. */
    no_focus_fallback?: boolean
    /** Allows resizing from the window border. */
    resize_on_border?: boolean
    /** Extends the resize grab area around the border. */
    extend_border_grab_area?: number
    /** Shows an icon on the border when hovered. */
    hover_icon_on_border?: boolean
    /** Allows tearing for the window. */
    allow_tearing?: boolean
    /** The corner used for resizing. */
    resize_corner?: number
    /** Blocks modal parent windows while opened. */
    modal_parent_blocking?: boolean
    /** The locale used by Hyprland. */
    locale?: string
    /** Snap behavior settings. */
    snap?: {
      /** Enables snapping. */
      enabled?: boolean
      /** The gap between snapped windows. */
      window_gap?: number
      /** The gap between snapped monitors. */
      monitor_gap?: number
      /** Allows borders to overlap during snapping. */
      border_overlap?: boolean
      /** Respects current gaps while snapping. */
      respect_gaps?: boolean
    }
  }

  /** Visual decoration settings such as blur, shadows, and rounding. */
  decoration?: {
    /** The rounding radius of window corners. */
    rounding?: number
    /** The power of the round corners curve. */
    rounding_power?: number
    /** The opacity for active windows. */
    active_opacity?: number
    /** The opacity for inactive windows. */
    inactive_opacity?: number
    /** The opacity for fullscreen windows. */
    fullscreen_opacity?: number
    /** Dims modal windows. */
    dim_modal?: boolean
    /** Dims inactive windows. */
    dim_inactive?: boolean
    /** The strength of the dim effect. */
    dim_strength?: number
    /** The dimming strength for special workspaces. */
    dim_special?: number
    /** The dimming strength around windows. */
    dim_around?: number
    /** The shader applied to the screen. */
    screen_shader?: string
    /** Includes the border in the window shape. */
    border_part_of_window?: boolean
    /** Blur configuration. */
    blur?: {
      /** Enables blur effects. */
      enabled?: boolean
      /** The blur size. */
      size?: number
      /** The number of blur passes. */
      passes?: number
      /** Ignores opacity when blurring. */
      ignore_opacity?: boolean
      /** Enables new blur optimizations. */
      new_optimizations?: boolean
      /** Enables xray blur rendering. */
      xray?: boolean
      /** The noise level for blur. */
      noise?: number
      /** The contrast level for blur. */
      contrast?: number
      /** The brightness level for blur. */
      brightness?: number
      /** The vibrancy factor for blur. */
      vibrancy?: number
      /** The darkness applied to vibrant blur. */
      vibrancy_darkness?: number
      /** Applies blur to special workspaces. */
      special?: boolean
      /** Applies blur to popups. */
      popups?: boolean
      /** The alpha threshold for popup blur. */
      popups_ignorealpha?: number
      /** Applies blur to input methods. */
      input_methods?: boolean
      /** The alpha threshold for input method blur. */
      input_methods_ignorealpha?: number
    }
    /** Shadow configuration. */
    shadow?: {
      /** Enables shadows. */
      enabled?: boolean
      /** The shadow range. */
      range?: number
      /** The rendering power of the shadow. */
      render_power?: 1 | 2 | 3 | 4
      /** Makes the shadow sharp. */
      sharp?: boolean
      /** The shadow color. */
      color?: Gradient
      /** The inactive shadow color. */
      color_inactive?: Gradient
      /** The shadow offset. */
      offset?: Vec2
      /** The shadow scale. */
      scale?: number
    }
    /** Glow configuration. */
    glow?: {
      /** Enables glow effects. */
      enabled?: boolean
      /** The glow range. */
      range?: number
      /** The rendering power of the glow. */
      render_power?: 1 | 2 | 3 | 4
      /** The glow color. */
      color?: Gradient
      /** The inactive glow color. */
      color_inactive?: Gradient
    }
    /** Motion blur configuration. */
    motion_blur?: {
      /** Enables motion blur. */
      enabled?: boolean
      /** The number of blur samples. */
      samples?: number
    }
  }

  /** Animation behavior settings. */
  animations?: {
    /** Enables animations. */
    enabled?: boolean
    /** Wraps workspaces around when reaching the edge. */
    workspace_wraparound?: boolean
  }

  /** Input device and keyboard settings. */
  input?: {
    /** The keyboard model. */
    kb_model?: string
    /** The keyboard layout. */
    kb_layout?: string
    /** The keyboard variant. */
    kb_variant?: string
    /** Keyboard options. */
    kb_options?: string
    /** Keyboard rules. */
    kb_rules?: string
    /** Keyboard layout file. */
    kb_file?: string
    /** Enables Num Lock by default. */
    numlock_by_default?: boolean
    /** Resolves binds by symbol. */
    resolve_binds_by_sym?: boolean
    /** The repeat rate of key presses. */
    repeat_rate?: number
    /** The repeat delay of key presses. */
    repeat_delay?: number
    /** The mouse sensitivity. */
    sensitivity?: number
    /** The acceleration profile used by the mouse. */
    accel_profile?: 'adaptive' | 'flat' | 'custom' | ''
    /** Disables mouse acceleration. */
    force_no_accel?: boolean
    /** The screen rotation. */
    rotation?: number
    /** Enables left-handed input. */
    left_handed?: boolean
    /** Scroll points used by the input device. */
    scroll_points?: string
    /** The scrolling method. */
    scroll_method?: '2fg' | 'edge' | 'on_button_down' | 'no_scroll' | ''
    /** The button used for scrolling. */
    scroll_button?: number
    /** Keeps the scroll button locked. */
    scroll_button_lock?: boolean
    /** The scroll factor. */
    scroll_factor?: number
    /** Enables natural scrolling. */
    natural_scroll?: boolean
    /** Follow-mouse behavior. */
    follow_mouse?: 0 | 1 | 2 | 3
    /** The shrink amount used by follow-mouse. */
    follow_mouse_shrink?: number
    /** The threshold for follow-mouse. */
    follow_mouse_threshold?: number
    /** The focus behavior when a window closes. */
    focus_on_close?: 0 | 1 | 2
    /** Refocuses the mouse after closing a window. */
    mouse_refocus?: boolean
    /** The focus override for floating windows. */
    float_switch_override_focus?: 0 | 1 | 2
    /** Allows special fallthrough behavior. */
    special_fallthrough?: boolean
    /** Controls axis events while a window is off-screen. */
    off_window_axis_events?: 0 | 1 | 2 | 3
    /** Enables discrete scroll emulation. */
    emulate_discrete_scroll?: 0 | 1 | 2

    /** Touchpad-specific input behavior. */
    touchpad?: {
      /** Disables touchpad while typing. */
      disable_while_typing?: boolean
      /** Enables natural scrolling for the touchpad. */
      natural_scroll?: boolean
      /** The scroll factor for the touchpad. */
      scroll_factor?: number
      /** Enables middle-button emulation. */
      middle_button_emulation?: boolean
      /** The tap button map. */
      tap_button_map?: 'lrm' | 'lmr' | ''
      /** Enables clickfinger behavior. */
      clickfinger_behavior?: boolean
      /** Enables tap-to-click. */
      tap_to_click?: boolean
      /** The drag lock mode. */
      drag_lock?: 0 | 1 | 2
      /** Enables tap-and-drag gestures. */
      tap_and_drag?: boolean
      /** Flips input on the X axis. */
      flip_x?: boolean
      /** Flips input on the Y axis. */
      flip_y?: boolean
      /** The 3-finger drag mode. */
      drag_3fg?: 0 | 1 | 2
    }

    /** Touch device-specific input configuration. */
    touchdevice?: {
      /** The transform applied to touch input. */
      transform?: number
      /** The output associated with the device. */
      output?: string
      /** Enables the touch device. */
      enabled?: boolean
    }

    /** Virtual keyboard configuration. */
    virtualkeyboard?: {
      /** Controls shared keyboard states. */
      share_states?: 0 | 1 | 2
      /** Releases pressed keys when the virtual keyboard closes. */
      release_pressed_on_close?: boolean
    }

    /** Tablet input configuration. */
    tablet?: {
      /** The tablet transform. */
      transform?: number
      /** The output associated with the tablet. */
      output?: string
      /** The position of the tablet region. */
      region_position?: Vec2
      /** Uses an absolute region position. */
      absolute_region_position?: boolean
      /** The size of the tablet region. */
      region_size?: Vec2
      /** Uses relative input mode. */
      relative_input?: boolean
      /** Enables left-handed tablet input. */
      left_handed?: boolean
      /** The active area size. */
      active_area_size?: Vec2
      /** The active area position. */
      active_area_position?: Vec2
    }

    /** Tablet tool configuration. */
    tablettool?: {
      /** The eraser button mode. */
      eraser_button_mode?: 0 | 1
      /** Overrides the eraser button. */
      eraser_button_override?: number
      /** The minimum pressure range. */
      pressure_range_min?: number
      /** The maximum pressure range. */
      pressure_range_max?: number
    }
  }

  /** Gesture and swipe settings. */
  gestures?: {
    /** The distance required for a workspace swipe. */
    workspace_swipe_distance?: number
    /** Enables workspace swipe gestures on touch input. */
    workspace_swipe_touch?: boolean
    /** Inverts swiping direction. */
    workspace_swipe_invert?: boolean
    /** Inverts touch swipe direction. */
    workspace_swipe_touch_invert?: boolean
    /** The minimum speed required to force a swipe. */
    workspace_swipe_min_speed_to_force?: number
    /** The cancel ratio for workspace swipes. */
    workspace_swipe_cancel_ratio?: number
    /** Creates a new workspace on swipe. */
    workspace_swipe_create_new?: boolean
    /** Locks swipe direction. */
    workspace_swipe_direction_lock?: boolean
    /** The threshold for direction lock. */
    workspace_swipe_direction_lock_threshold?: number
    /** Keeps workspace swipe gestures active forever. */
    workspace_swipe_forever?: boolean
    /** Uses the right side of the touchpad for gestures. */
    workspace_swipe_use_r?: boolean
    /** The maximum timeout for closing windows. */
    close_max_timeout?: number

    /** Scrolling gestures. */
    scrolling?: {
      /** Snaps moved windows to a grid. */
      move_snap_to_grid?: boolean
      /** Snaps the cursor while moving windows. */
      move_snap_cursor?: boolean
    }
  }

  /** Grouping behavior settings. */
  group?: {
    /** Automatically groups windows. */
    auto_group?: boolean
    /** Inserts new windows after the current one. */
    insert_after_current?: boolean
    /** Focuses the window removed from a group. */
    focus_removed_window?: boolean
    /** Controls drag-into-group behavior. */
    drag_into_group?: 0 | 1 | 2
    /** Merges groups on drag. */
    merge_groups_on_drag?: boolean
    /** Merges groups on the group bar. */
    merge_groups_on_groupbar?: boolean
    /** Merges floated windows into tiled ones on the group bar. */
    merge_floated_into_tiled_on_groupbar?: boolean
    /** Groups windows when moved to a workspace. */
    group_on_movetoworkspace?: boolean
    /** The active group border color. */
    'col.border_active'?: Gradient
    /** The inactive group border color. */
    'col.border_inactive'?: Gradient
    /** The active locked group border color. */
    'col.border_locked_active'?: Gradient
    /** The inactive locked group border color. */
    'col.border_locked_inactive'?: Gradient

    /** Group bar presentation settings. */
    groupbar?: {
      /** Enables the group bar. */
      enabled?: boolean
      /** The group bar font family. */
      font_family?: string
      /** The group bar font size. */
      font_size?: number
      /** The active group bar font weight. */
      font_weight_active?: FontWeight
      /** The inactive group bar font weight. */
      font_weight_inactive?: FontWeight
      /** Enables gradients in the group bar. */
      gradients?: boolean
      /** The group bar height. */
      height?: number
      /** The indicator gap inside the group bar. */
      indicator_gap?: number
      /** The indicator height inside the group bar. */
      indicator_height?: number
      /** Stacks the group bar indicators. */
      stacked?: boolean
      /** The priority of the group bar. */
      priority?: number
      /** Renders titles in the group bar. */
      render_titles?: boolean
      /** The text offset in the group bar. */
      text_offset?: number
      /** The text padding in the group bar. */
      text_padding?: number
      /** Enables scrolling in the group bar. */
      scrolling?: boolean
      /** The rounding radius of the group bar. */
      rounding?: number
      /** The power of the group bar rounding curve. */
      rounding_power?: number
      /** The rounding radius for gradients. */
      gradient_rounding?: number
      /** The power of the gradient rounding curve. */
      gradient_rounding_power?: number
      /** Rounds only the selected edges. */
      round_only_edges?: boolean
      /** Rounds only the gradient edges. */
      gradient_round_only_edges?: boolean
      /** The active text color. */
      text_color?: string
      /** The inactive text color. */
      text_color_inactive?: string
      /** The active locked text color. */
      text_color_locked_active?: string
      /** The inactive locked text color. */
      text_color_locked_inactive?: string
      /** The active group bar color. */
      'col.active'?: Gradient
      /** The inactive group bar color. */
      'col.inactive'?: Gradient
      /** The active locked group bar color. */
      'col.locked_active'?: Gradient
      /** The inactive locked group bar color. */
      'col.locked_inactive'?: Gradient
      /** The inner gaps of the group bar. */
      gaps_in?: number
      /** The outer gaps of the group bar. */
      gaps_out?: number
      /** Keeps the upper gap in the group bar. */
      keep_upper_gap?: boolean
      /** Closes the group bar on middle click. */
      middle_click_close?: boolean
      /** Enables blur for the group bar. */
      blur?: boolean
    }
  }

  /** Miscellaneous Hyprland behavior settings. */
  misc?: {
    /** Disables the Hyprland logo. */
    disable_hyprland_logo?: boolean
    /** Disables the splash rendering. */
    disable_splash_rendering?: boolean
    /** Disables the scale notification. */
    disable_scale_notification?: boolean
    /** The splash color. */
    'col.splash'?: string
    /** The font family used by Hyprland. */
    font_family?: string
    /** The font family used by the splash screen. */
    splash_font_family?: string
    /** Controls the default wallpaper behavior. */
    force_default_wallpaper?: -1 | 0 | 1 | 2
    /** The VRR mode. */
    vrr?: 0 | 1 | 2 | 3
    /** Enables DPMS on mouse movement. */
    mouse_move_enables_dpms?: boolean
    /** Enables DPMS on key press. */
    key_press_enables_dpms?: boolean
    /** Names the virtual keyboard after the process. */
    name_vk_after_proc?: boolean
    /** Always follows windows on drag-and-drop. */
    always_follow_on_dnd?: boolean
    /** Makes layers hog keyboard focus. */
    layers_hog_keyboard_focus?: boolean
    /** Animates manual resizes. */
    animate_manual_resizes?: boolean
    /** Animates mouse window dragging. */
    animate_mouse_windowdragging?: boolean
    /** Disables autoreload. */
    disable_autoreload?: boolean
    /** Enables window swallowing. */
    enable_swallow?: boolean
    /** The swallow regex. */
    swallow_regex?: string
    /** The swallow exception regex. */
    swallow_exception_regex?: string
    /** Focuses windows on activation. */
    focus_on_activate?: boolean
    /** Moves focus when the mouse moves between monitors. */
    mouse_move_focuses_monitor?: boolean
    /** Restores session lock state. */
    allow_session_lock_restore?: boolean
    /** Enables X-ray on session lock. */
    session_lock_xray?: boolean
    /** The background color used by Hyprland. */
    background_color?: string
    /** Closes special workspaces when empty. */
    close_special_on_empty?: boolean
    /** Controls focus behavior under fullscreen. */
    on_focus_under_fullscreen?: 0 | 1 | 2
    /** Retains fullscreen state when the window closes. */
    exit_window_retains_fullscreen?: boolean
    /** Tracks initial workspaces. */
    initial_workspace_tracking?: 0 | 1 | 2
    /** Enables middle-click paste. */
    middle_click_paste?: boolean
    /** The FPS used for unfocused windows. */
    render_unfocused_fps?: number
    /** Disables XDG environment checks. */
    disable_xdg_env_checks?: boolean
    /** Disables GUI utility checks. */
    disable_hyprland_guiutils_check?: boolean
    /** The delay for dead screen locking. */
    lockdead_screen_delay?: number
    /** Enables ANR dialogs. */
    enable_anr_dialog?: boolean
    /** The number of missed pings before ANR. */
    anr_missed_pings?: number
    /** Limits tiled window sizes. */
    size_limits_tiled?: boolean
    /** Forces 8-bit screen capture. */
    screencopy_force_8b?: boolean
    /** Disables watchdog warnings. */
    disable_watchdog_warning?: boolean
  }

  /** Layout-specific behavior settings. */
  layout?: {
    /** The aspect ratio for a single window. */
    single_window_aspect_ratio?: Vec2
    /** The tolerance for the aspect ratio. */
    single_window_aspect_ratio_tolerance?: number
  }

  /** Bind-related behavior settings. */
  binds?: {
    /** Passes mouse events when a keybind is used. */
    pass_mouse_when_bound?: boolean
    /** The delay between scroll events. */
    scroll_event_delay?: number
    /** Enables workspace back-and-forth behavior. */
    workspace_back_and_forth?: boolean
    /** Hides special workspaces when changing workspaces. */
    hide_special_on_workspace_change?: boolean
    /** Allows workspace cycling. */
    allow_workspace_cycles?: boolean
    /** Centers the workspace on the selected target. */
    workspace_center_on?: 0 | 1
    /** The preferred focus method. */
    focus_preferred_method?: 0 | 1
    /** Ignores group lock state. */
    ignore_group_lock?: boolean
    /** Cycles focus through fullscreen windows. */
    movefocus_cycles_fullscreen?: boolean
    /** Cycles focus through group-first windows. */
    movefocus_cycles_groupfirst?: boolean
    /** Falls back to the monitor direction if necessary. */
    window_direction_monitor_fallback?: boolean
    /** Disables grabbing keybinds. */
    disable_keybind_grabbing?: boolean
    /** Allows pinning fullscreen windows. */
    allow_pin_fullscreen?: boolean
    /** The drag threshold for window movement. */
    drag_threshold?: number
  }

  /** XWayland-related settings. */
  xwayland?: {
    /** Enables XWayland. */
    enabled?: boolean
    /** Uses nearest-neighbor scaling for XWayland. */
    use_nearest_neighbor?: boolean
    /** Forces zero scaling for XWayland surfaces. */
    force_zero_scaling?: boolean
    /** Creates an abstract socket for XWayland. */
    create_abstract_socket?: boolean
  }

  /** OpenGL rendering settings. */
  opengl?: {
    /** Enables NVIDIA anti-flicker. */
    nvidia_anti_flicker?: boolean
  }

  /** Rendering behavior settings. */
  render?: {
    /** Enables direct scanout. */
    direct_scanout?: 0 | 1 | 2
    /** Expands undersized textures. */
    expand_undersized_textures?: boolean
    /** Enables XP mode. */
    xp_mode?: boolean
    /** Enables CTM animation. */
    ctm_animation?: 0 | 1 | 2
    /** Enables color management. */
    cm_enabled?: boolean
    /** Sends content type information. */
    send_content_type?: boolean
    /** Enables auto HDR for color management. */
    cm_auto_hdr?: 0 | 1 | 2
    /** Enables new render scheduling. */
    new_render_scheduling?: boolean
    /** Enables non-shader color management. */
    non_shader_cm?: 0 | 1 | 2 | 3
    /** Enables non-shader CM interop. */
    non_shader_cm_interop?: 0 | 1 | 2
    /** The SDR EOTF mode. */
    cm_sdr_eotf?: 'default' | 'gamma22' | 'gamma22force' | 'srgb'
    /** Enables commit timing. */
    commit_timing_enabled?: boolean
    /** Enables FP16 rendering. */
    use_fp16?: 0 | 1 | 2
    /** Keeps an unmodified copy of content. */
    keep_unmodified_copy?: 0 | 1 | 2
    /** Uses shader blur blending. */
    use_shader_blur_blend?: boolean
    /** Enables ICC VCGT. */
    icc_vcgt_enabled?: boolean
    /** The FP16 SDR transfer function. */
    fp16_sdr_tf?: 0 | 1
  }

  /** Cursor behavior settings. */
  cursor?: {
    /** Makes the cursor invisible. */
    invisible?: boolean
    /** Syncs the cursor theme from GSettings. */
    sync_gsettings_theme?: boolean
    /** Controls hardware cursor behavior. */
    no_hardware_cursors?: 0 | 1 | 2
    /** Disables fullscreen VRR break. */
    no_break_fs_vrr?: 0 | 1 | 2
    /** The minimum refresh rate for the cursor. */
    min_refresh_rate?: number
    /** Padding around the hot spot. */
    hotspot_padding?: number
    /** The inactive timeout. */
    inactive_timeout?: number
    /** Prevents cursor warps. */
    no_warps?: boolean
    /** Keeps persistent warps. */
    persistent_warps?: boolean
    /** Warps the cursor when changing workspaces. */
    warp_on_change_workspace?: 0 | 1 | 2
    /** Warps the cursor when toggling special workspaces. */
    warp_on_toggle_special?: 0 | 1 | 2
    /** The default monitor for the cursor. */
    default_monitor?: string
    /** The zoom factor. */
    zoom_factor?: number
    /** Makes zoom rigid. */
    zoom_rigid?: boolean
    /** Enables detached camera zoom. */
    zoom_detached_camera?: boolean
    /** Enables Hyprcursor. */
    enable_hyprcursor?: boolean
    /** Hides the cursor on key press. */
    hide_on_key_press?: boolean
    /** Hides the cursor on touch input. */
    hide_on_touch?: boolean
    /** Hides the cursor on tablet input. */
    hide_on_tablet?: boolean
    /** Uses the CPU buffer for the cursor. */
    use_cpu_buffer?: 0 | 1 | 2
    /** Warps the cursor back after non-mouse input. */
    warp_back_after_non_mouse_input?: boolean
    /** Disables anti-aliasing for zoom. */
    zoom_disable_aa?: boolean
  }

  /** Ecosystem-related settings. */
  ecosystem?: {
    /** Disables update news. */
    no_update_news?: boolean
    /** Disables donation prompts. */
    no_donation_nag?: boolean
    /** Enforces permissions. */
    enforce_permissions?: boolean
  }

  /** Compatibility quirks. */
  quirks?: {
    /** Prefers HDR. */
    prefer_hdr?: 0 | 1 | 2
    /** Skips non-KMS DMA-BUF formats. */
    skip_non_kms_dmabuf_formats?: boolean
  }

  /** Debugging and logging settings. */
  debug?: {
    /** Enables the overlay. */
    overlay?: boolean
    /** Blinks damage tracking. */
    damage_blink?: boolean
    /** Enables OpenGL debugging. */
    gl_debugging?: boolean
    /** Enables variable frame rate. */
    vfr?: boolean
    /** Disables logs. */
    disable_logs?: boolean
    /** Disables timing data. */
    disable_time?: boolean
    /** The damage tracking mode. */
    damage_tracking?: 0 | 1 | 2
    /** Enables stdout logs. */
    enable_stdout_logs?: boolean
    /** Manually crashes Hyprland. */
    manual_crash?: 0 | 1
    /** Suppresses error output. */
    suppress_errors?: boolean
    /** Logs damage events. */
    log_damage?: boolean
    /** Disables scale checks. */
    disable_scale_checks?: boolean
    /** The error limit. */
    error_limit?: number
    /** The error position. */
    error_position?: 0 | 1
    /** Colors stdout logs. */
    colored_stdout_logs?: boolean
    /** Enables pass-through mode. */
    pass?: boolean
    /** Enables full CM protocol logs. */
    full_cm_proto?: boolean
    /** Handles same buffer damage. */
    ds_handle_same_buffer?: boolean
    /** Handles same-buffer FIFO workarounds. */
    ds_handle_same_buffer_fifo?: boolean
    /** Applies FIFO pending workarounds. */
    fifo_pending_workaround?: boolean
    /** Renders solitary windows without damage tracking. */
    render_solitary_wo_damage?: boolean
    /** Invalidates FP16 rendering. */
    invalidate_fp16?: 0 | 1 | 2
  }

  /** Experimental features. */
  experimental?: {
    /** Enables Wayland CM 1.2. */
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
