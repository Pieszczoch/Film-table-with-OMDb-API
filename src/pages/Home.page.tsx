import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Button, Center, Flex, Group, Input, Select, Table } from '@mantine/core';
import { TypeEnums } from '@/consts';
import { useFiltersParams } from '@/hooks';
import { useMoviesQuery } from '@/table.api';

export function HomePage() {
  const { getParams } = useFiltersParams();
  const [_, setParams] = useSearchParams();

  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<string>('Movie');

  const movie = useMoviesQuery({
    params: getParams,
  });

  if (!movie.data) {
    return <>Coś poszło nie tak</>;
  }

  return (
    <Box maw={1000} px="md" mx="auto" my="lg">
      <Flex align="end" gap="md" mb="lg" justify="center">
        <Input.Wrapper label="Wpisz tytuł">
          <Input onChange={(e) => setTitle(e.currentTarget.value)} />
        </Input.Wrapper>
        <Select
          label="Wybierz typ"
          defaultValue={'Movie'}
          data={TypeEnums}
          onChange={(e) => {
            setType(String(e));
          }}
        />
        <Button onClick={() => setParams({ t: title, type: type })}>Wyszukaj film</Button>
      </Flex>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Year</Table.Th>
            <Table.Th>Country</Table.Th>
            <Table.Th>Type</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {movie.data.Response === 'True' && (
            <Table.Tr>
              <Table.Td>{movie.data.Title}</Table.Td>
              <Table.Td>{movie.data.Year}</Table.Td>
              <Table.Td>{movie.data.Country}</Table.Td>
              <Table.Td>{movie.data.Type}</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      {movie.data.Response === 'False' && <Center>Incorrect IMDb ID</Center>}
    </Box>
  );
}
