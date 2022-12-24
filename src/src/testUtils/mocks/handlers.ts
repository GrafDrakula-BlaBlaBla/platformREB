import {rest} from 'msw';
import user from './data/user.json';
import users from './data/users.json';

export default [
  rest.get(`${process.env.PUBLIC_URL}/data/users/1`, (res, req, ctx) => {
    // @ts-ignore
    return res(ctx.json(user));
  }),
  rest.get(`${process.env.PUBLIC_URL}/data/users`, (res, req, ctx) => {
    // @ts-ignore
    return res(ctx.json(users));
  }),
];
