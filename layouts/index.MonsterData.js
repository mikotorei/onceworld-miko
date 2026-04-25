window.MONSTERS = [
{{- $monsters := where .Site.RegularPages "Section" "monster" -}}
{{- $sorted := sort $monsters "Params.id" -}}
{{- range $i, $m := $sorted }}
{
  id: "{{ $m.Params.id }}",
  title: "{{ $m.Params.title }}",
  element: "{{ $m.Params.element }}",
  attack_type: "{{ $m.Params.attack_type }}",
  attack_range: "{{ $m.Params.attack_range }}",
  level_shortcuts: {{ $m.Params.level_shortcuts | jsonify }},
  exp: {{ if $m.Params.exp }}{{ $m.Params.exp }}{{ else }}0{{ end }},
  gold: {{ if $m.Params.gold }}{{ $m.Params.gold }}{{ else }}0{{ end }},
  capture_rate: {{ if $m.Params.capture_rate }}{{ $m.Params.capture_rate }}{{ else }}0{{ end }},
  drops: {{ $m.Params.drops | jsonify }},
  locations: {{ $m.Params.locations | jsonify }},
  vit: {{ if $m.Params.status }}{{ if $m.Params.status.vit }}{{ $m.Params.status.vit }}{{ else }}0{{ end }}{{ else }}0{{ end }},
  spd: {{ if $m.Params.status }}{{ if $m.Params.status.spd }}{{ $m.Params.status.spd }}{{ else }}0{{ end }}{{ else }}0{{ end }},
  atk: {{ if $m.Params.status }}{{ if $m.Params.status.atk }}{{ $m.Params.status.atk }}{{ else }}0{{ end }}{{ else }}0{{ end }},
  int: {{ if $m.Params.status }}{{ if $m.Params.status.int }}{{ $m.Params.status.int }}{{ else }}0{{ end }}{{ else }}0{{ end }},
  def: {{ if $m.Params.status }}{{ if $m.Params.status.def }}{{ $m.Params.status.def }}{{ else }}0{{ end }}{{ else }}0{{ end }},
  mdef: {{ if $m.Params.status }}{{ if $m.Params.status.mdef }}{{ $m.Params.status.mdef }}{{ else }}0{{ end }}{{ else }}0{{ end }},
  luk: {{ if $m.Params.status }}{{ if $m.Params.status.luk }}{{ $m.Params.status.luk }}{{ else }}0{{ end }}{{ else }}0{{ end }},
  mov: {{ if $m.Params.fixed_status }}{{ if $m.Params.fixed_status.mov }}{{ $m.Params.fixed_status.mov }}{{ else }}0{{ end }}{{ else }}0{{ end }}
}{{ if lt (add $i 1) (len $sorted) }},{{ end }}
{{- end }}
];
