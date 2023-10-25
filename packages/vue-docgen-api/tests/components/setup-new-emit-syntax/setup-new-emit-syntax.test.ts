import * as path from 'path'
import { ComponentDoc } from '../../../src/Documentation'
import { parse } from '../../../src/main'

let doc: ComponentDoc

describe.each(['./NewEmitSyntax.vue', './NewEmitSyntaxSeparateType.vue'])(
	'setup new defineEmits syntax from Vue 3.3 for file %s',
	fileName => {
		beforeEach(async () => {
			const filePath = path.join(__dirname, fileName)
			doc = await parse(filePath)
		})

		describe('props', () => {
			it('should find 3 props', () => {
				expect(doc.props).toHaveLength(1)
			})

			it('should match the snapshot', () => {
				expect(doc.props).toMatchInlineSnapshot(`
				[
				  {
				    "description": "The value of the input",
				    "name": "modelValue",
				    "required": true,
				    "type": {
				      "name": "string",
				    },
				  },
				]
			`)
			})
		})

		describe('events', () => {
			it('should return a doc object containing events', () => {
				expect(doc.events).toHaveLength(4)
			})

			it('should match the snapshot', () => {
				expect(doc.events).toMatchInlineSnapshot(`
					[
					  {
					    "description": "An event without payload",
					    "name": "eventWithoutPayload",
					    "type": undefined,
					  },
					  {
					    "description": "An event with named tuple as payload",
					    "name": "eventWithNamedPayload",
					    "type": {
					      "elements": [
					        {
					          "name": "boolean",
					        },
					        {
					          "name": "string",
					        },
					      ],
					      "names": [
					        "tuple",
					      ],
					    },
					  },
					  {
					    "description": "An event with unnamed tuple as payload",
					    "name": "eventWithUnnamedPayload",
					    "type": {
					      "names": [
					        "number",
					      ],
					    },
					  },
					  {
					    "description": "Event used for v-model",
					    "name": "update:modelValue",
					    "type": {
					      "names": [
					        "string",
					      ],
					    },
					  },
					]
				`)
			})
		})
	}
)
