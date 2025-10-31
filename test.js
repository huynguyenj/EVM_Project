const date = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)
console.log(date)