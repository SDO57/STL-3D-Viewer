Avant d'executer le projet, il faut :

A) creer la base de donnee si ce n'est pas deja fait
----------------------------------------------------
A.1) lancer les commandes dans le terminal :

dotnet tool install --global dotnet-ef

A.2) installer le package Microsoft.EntityFrameworkCore.Design 
depuis le gestionnaire de package nuggets
ou depuis la console du Gestionnaire de package (PMC) : Install-Package Microsoft.EntityFrameworkCore.Tools


A.3) creation de la DB SQLLite dans le terminal: 

dotnet ef migrations add InitialCreate --project Infra
dotnet ef database update --project Infra


B) realiser la migration si vous avez modifié les classes du modele de donnée STLClasses 
----------------------------------------------------------------------------------------
B.1 ) dans le terminal : 

dotnet ef migrations add ParExempleAjoutColonne --project Infra
dotnet ef database update --project Infra


C ) Populate DB with samples
-----------------------------
=> Run StartDemoPopulateDataBase.cs


D ) Generer les POCO en DBFirst pour un projet client :
-------------------------------------------------------
Install .NET Core CLI
Install Ef Tool

dotnet tool install --global dotnet-ef

Make sure to Install Microsoft.EntityFrameworkCore.Designer and Microsoft.EntityFrameworkCore.Sqlite in your project

From project folder run the command:

dotnet ef dbcontext scaffold "data source=C:\dbPath\db.sqlite" Microsoft.EntityFrameworkCore.Sqlite --output-dir DataModel
