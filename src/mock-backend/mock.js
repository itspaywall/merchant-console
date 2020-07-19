import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mock = new MockAdapter(axios, { delayResponse: 2000 });

export default mock;
