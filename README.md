# Soup Language

![status](https://github.com/plug-obp/soup-js/actions/workflows/node.js.yml/badge.svg) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fplug-obp%2Fsoup-js.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fplug-obp%2Fsoup-js?ref=badge_shield) [![codecov](https://codecov.io/gh/plug-obp/soup-js/graph/badge.svg?token=WEJJQY5NSB)](https://codecov.io/gh/plug-obp/soup-js)

This is a simple language based on piecewise relations.

## TODO

- [x] Grammar
  - [ ] tests
- [x] SoupReader
- [x] Syntax Tree Model
  - [ ] define structural equality with a visitor instead of inline
- [x] Map the Antlr4 tree to the Syntax Model
  - [x] Add position information from ANTLR4
  - [x] tests for Antlr4 to Syntax Model
- [x] Linker, to link the references in the tree
- [x] Expression semantics, visitor expression -> value
  - [x] tests
  - [x] add runtime type checks
- [x] Statement semantics
  - [x] tests
- [x] Soup semantics
  - [x] tests
- [x] Add step evaluation
  - [x] primed reference `IDENTIFIER'`
  - [x] NamedPieceReference `p:IDENTIFIER`
  - [x] Enabled `enabled expression`
  - [x] tests

## Missing things

This is just a simple Soup, some things are missing, and that is normal.

- variable definition in the piece scope (Local To Transition)
- multiple initial states
- non-deterministic assignment
- synchronizations: 2-channels, n-m channels, clocks
- priority amongst pieces
- time, a la DBM
- structures and union, to get sum-of-product user-defined datatypes
- pattern matching
- macros or VHDL-like generate statements. Can use M4 for this.
- functions
- modules
- dynamic instantiation
- ...


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fplug-obp%2Fsoup-js.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fplug-obp%2Fsoup-js?ref=badge_large)