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
  exp: {{ default 0 $m.Params.exp }},
  gold: {{ default 0 $m.Params.gold }},
  capture_rate: {{ default 0 $m.Params.capture_rate }},
  drops: {{ $m.Params.drops | jsonify }},
  locations: {{ $m.Params.locations | jsonify }},
  vit: {{ default 0 $m.Params.status.vit }},
  spd: {{ default 0 $m.Params.status.spd }},
  atk: {{ default 0 $m.Params.status.atk }},
  int: {{ default 0 $m.Params.status.int }},
  def: {{ default 0 $m.Params.status.def }},
  mdef: {{ default 0 $m.Params.status.mdef }},
  luk: {{ default 0 $m.Params.status.luk }},
  mov: {{ default 0 $m.Params.fixed_status.mov }}
}{{ if lt (add $i 1) (len $sorted) }},{{ end }}
{{- end }}
];
