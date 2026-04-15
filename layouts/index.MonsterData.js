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
  exp: {{ $m.Params.exp }},
  gold: {{ $m.Params.gold }},
  capture_rate: {{ $m.Params.capture_rate }},
  drops: {{ $m.Params.drops | jsonify }},
  locations: {{ $m.Params.locations | jsonify }},
  vit: {{ $m.Params.status.vit }},
  spd: {{ $m.Params.status.spd }},
  atk: {{ $m.Params.status.atk }},
  int: {{ $m.Params.status.int }},
  def: {{ $m.Params.status.def }},
  mdef: {{ $m.Params.status.mdef }},
  luk: {{ $m.Params.status.luk }},
  mov: {{ $m.Params.fixed_status.mov }}
}{{ if lt (add $i 1) (len $sorted) }},{{ end }}
{{- end }}
];
