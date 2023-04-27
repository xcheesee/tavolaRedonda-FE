<div class="grid grid-cols-[300px_1fr] h-full">
	<div class="bg-surface-800">
		<ul class="flex flex-col gap-8 [&>*]:text-xl [&>*]:p-4">
			<a href="/menu/perfil" class="unstyled hover:bg-primary-500"><li class="">Perfil</li></a>
			<a href="/menu" class="unstyled hover:bg-primary-500"><li class="">Menu</li></a>
			<a href="/pedidos" class="unstyled hover:bg-primary-500"><li class="">Meus Pedidos</li></a>
		</ul>
	</div>
	<slot/>
</div>
