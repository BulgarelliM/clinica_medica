INSERT INTO pessoa (nome , email , telefone , cep , logradouro , bairro , cidade , estado)
VALUES ('Renan', 'renan@email.com', '31988886666','3011012','Rua 1', 'Floresta', 'BH', 'MG');

INSERT INTO funcionario (datacontrato, salario, senha, status)
VALUES ('10-02-2015', 4507.52, '0123', true);

INSERT INTO paciente (peso, altura, tiposanguineo)
VALUES (80.5, 1.81, 'O-');

INSERT INTO medico (especialidade, crm)
VALUES ('Neurocirurgião', 4567518);

INSERT INTO base_enderecos (cep, logradouro, bairro, cidade, estado)
VALUES ('3011012','Rua 1', 'Floresta', 'BH', 'MG');

INSERT INTO agenda (data, horario, nome, email, telefone)
VALUES ('25-04-2021', '25-04-2021T16:00:00', 'Roberto', 'roberto@email.com','38976543210');

insert into agenda (idAgenda, data, horario, nome, email, telefone, medico_id) 
values ('a1', '01-04-2021', '14:00:00', 'Paulo', 'paulo@email.com', '33985555', 'm01');

{"idAgenda": "a4", "data": "04-05-2021", "horario": "11:00", "email": "luquinhas@email.com", "telefone": "33845522", "medico_id": "m01"}