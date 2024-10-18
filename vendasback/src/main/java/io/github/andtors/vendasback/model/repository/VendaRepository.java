package io.github.andtors.vendasback.model.repository;

import io.github.andtors.vendasback.model.Venda;
import io.github.andtors.vendasback.model.repository.projections.VendaPorMes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VendaRepository extends JpaRepository<Venda, Long> {

    @Query( nativeQuery = true,
            value = "select "
                    + "	extract( month from v.data_venda ) as mes, "
                    + "	sum(v.total) as valor"
                    + " from venda as v"
                    + " where extract (year from v.data_venda) = :ano"
                    + " group by extract( month from v.data_venda )"
                    + " order by extract( month from v.data_venda )"
    )
    List<VendaPorMes> obterSomatoriaVendasPorMes(@Param("ano") Integer ano);
}
