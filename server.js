const Koa = require('koa');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const uuid = require('uuid');

const allTickets = [
  {
    id: 1,
    name: 'Поменять краску в принтере, ком. 404',
    description: 'Description 1',
    status: 'closed',
    created: '2020-01-01',
  },
  {
    id: 2,
    name: 'Переустановить винду',
    description: 'Description 2',
    status: 'open',
    created: '2020-01-01',
  },
];

const app = new Koa();
app.use(koaBody());
app.use(cors());

// Logger
app.use(async (ctx, next) => {
  await next();

  console.log(`Method: ${ctx.method}  URL: ${ctx.url} `);
  console.log(ctx.request);
});

app.use(async (ctx) => {
  let id; let
    ticket;
  switch (ctx.request.query.method) {
    case 'allTickets':
      ctx.body = JSON.stringify(allTickets);
      return;

    case 'ticketById':
      id = ctx.request.query.id;
      // eslint-disable-next-line eqeqeq
      ticket = allTickets.find((t) => t.id == id);
      ctx.body = JSON.stringify(ticket);
      return;

    case 'createTicket':
      // eslint-disable-next-line no-case-declarations
      id = uuid.v4();
      // eslint-disable-next-line no-case-declarations
      const { name, description, status } = ctx.request.body;
      // eslint-disable-next-line no-case-declarations
      const created = new Date().toISOString().slice(0, 10);
      ticket = {
        id, name, description, status, created,
      };
      allTickets.push(ticket);
      ctx.body = JSON.stringify(ticket);
      return;

    default:
      ctx.response.status = 404;
  }
});

app.listen(3000);
