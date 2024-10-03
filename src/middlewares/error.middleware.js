export const errorMiddleware = (err, req, res, __) => {
const error ={...err};
if(Object.hasOwn(error, 'schema') || Object.hasOwn(error, 'table') || Object.hasOwn(error, 'column')){
  error.message = `DATABASE::${error.code}::${error.detail}`;
  error.code = 500;
}
if (error.code === 'ECONNREFUSED') {
  error.code = 500;
}

const message = error.message ? error.message : 'Internal Error';
const code = error.code ?? 500;
const response = {
  status: false,
  data: message
};

res.status(code).json(response);

};
