var tape = require('tape')
var path = require('path')
var fs = require('fs')
var schema = require('../')

var fixture = function(name) {
  return fs.readFileSync(path.join(__dirname, 'fixtures', name), 'utf-8')
}

tape('basic parse', function(t) {
  t.same(schema.parse(fixture('basic.proto')), require('./fixtures/basic.json'))
  t.end()
})

tape('basic parse + stringify', function(t) {
  t.same(schema.stringify(schema.parse(fixture('basic.proto'))), fixture('basic.proto'))
  t.end()
})

tape('complex parse', function(t) {
  t.same(schema.parse(fixture('complex.proto')), require('./fixtures/complex.json'))
  t.end()
})

tape('complex parse + stringify', function(t) {
  t.same(schema.stringify(schema.parse(fixture('complex.proto'))), fixture('complex.proto'))
  t.end()
})

tape('throws on invalid', function(t) {
  t.plan(2)
  try {
    schema.parse('hello world')
  } catch (err) {
    t.ok(true, 'should fail')
  }
  try {
    schema.parse('message Foo { lol }')
  } catch (err) {
    t.ok(true, 'should fail')
  }
})